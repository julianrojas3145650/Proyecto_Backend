import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { CallUser } from './entities/call-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usuarioRepo: Repository<User>,
    @InjectRepository(CallUser)
    private readonly llamarUsuarioRepo: Repository<CallUser>,
  ) {}

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existe = await this.usuarioRepo.findOne({
      where: { email: dto.email },
    });
    if (existe) throw new BadRequestException('El email ya está registrado');

    const hashed = await bcrypt.hash(dto.password, 10);
    const now = new Date();

    const usuario = this.usuarioRepo.create({
      ...dto,
      password: hashed,
      fecha_creacion: now,
      ultimo_acceso: now,
      activo: dto.activo ?? true,
    });

    const saved = await this.usuarioRepo.save(usuario);

    await this.llamarUsuarioRepo.save(
      this.llamarUsuarioRepo.create({
        id_usuario: saved.id_usuario,
        fecha_creacion: now,
        fecha_modificacion: now,
      }),
    );

    const { password, ...result } = saved;
    return result;
  }

  async findAll(paginationDto: PaginationDto): Promise<Pagination<Omit<User, 'password'>>> {
    const { page = 1, limit = 10 } = paginationDto;
    const paginatedResult = await paginate<User>(this.usuarioRepo, { page, limit }, {
      relations: ['usuarioRoles', 'usuarioRoles.rol'],
    });

    // Remover contraseñas del resultado paginado
    const itemsWithoutPassword = paginatedResult.items.map(({ password, ...u }) => u);
    
    return {
      ...paginatedResult,
      items: itemsWithoutPassword as any,
    };
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id_usuario: id },
      relations: ['usuarioRoles', 'usuarioRoles.rol'],
    });
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);
    const { password, ...result } = usuario;
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usuarioRepo.findOne({
      where: { email },
      relations: [
        'usuarioRoles',
        'usuarioRoles.rol',
        'usuarioRoles.rol.rolPermisos',
        'usuarioRoles.rol.rolPermisos.permiso',
      ],
    });
  }

  async findByDocumento(documento: string): Promise<User | null> {
    return this.usuarioRepo.findOne({
      where: { documento },
      relations: [
        'usuarioRoles',
        'usuarioRoles.rol',
        'usuarioRoles.rol.rolPermisos',
        'usuarioRoles.rol.rolPermisos.permiso',
      ],
    });
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id_usuario: id },
    });
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = Object.assign(usuario, dto);
    const saved = await this.usuarioRepo.save(updated);

    // Actualizar fecha_modificacion en llamar_usuario
    await this.llamarUsuarioRepo.update(
      { id_usuario: id },
      { fecha_modificacion: new Date() },
    );

    const { password, ...result } = saved;
    return result;
  }

  async remove(id: string): Promise<{ message: string }> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id_usuario: id },
    });
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);
    await this.usuarioRepo.softRemove(usuario);
    return { message: `Usuario ${id} eliminado correctamente` };
  }

  async updateUltimoAcceso(id: string): Promise<void> {
    await this.usuarioRepo.update(id, { ultimo_acceso: new Date() });
  }

  // Método utilitario para obtener o crear llamar_usuario por usuario
  async getLlamarUsuario(id_usuario: string): Promise<CallUser> {
    let llamar = await this.llamarUsuarioRepo.findOne({
      where: { id_usuario },
    });
    if (!llamar) {
      const now = new Date();
      llamar = await this.llamarUsuarioRepo.save(
        this.llamarUsuarioRepo.create({
          id_usuario,
          fecha_creacion: now,
          fecha_modificacion: now,
        }),
      );
    }
    return llamar;
  }
}
