import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ access_token: string; usuario: any }> {
    this.logger.log(`Intentando login para el correo: ${dto.email}`);

    // 1. Buscar el usuario
    const usuario = await this.usersService.findByEmail(dto.email);

    if (!usuario) {
      this.logger.error(`Usuario no encontrado: ${dto.email}`);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Verificar si está activo
    if (!usuario.activo) {
      this.logger.warn(`Intento de entrada con usuario inactivo: ${dto.email}`);
      throw new UnauthorizedException('Usuario inactivo. Contacte al administrador');
    }

    // 3. Comparación de contraseñas con LOG DE EMERGENCIA
    /** const passwordMatch = await bcrypt.compare(dto.password, usuario.password);

    !const hashDePrueba = await bcrypt.hash("Password123", 10);
    this.logger.debug(`PARA LA BD USA ESTE: ${hashDePrueba}`);

    this.logger.debug('--- DEBUG DE EMERGENCIA ---');
    this.logger.debug(`Password enviado en Postman: ${dto.password}`);
    this.logger.debug(`Hash leído de la BD: [${usuario.password}]`); 
    this.logger.debug(`¿Coinciden según bcrypt?: ${passwordMatch}`);

    if (!passwordMatch) {
      this.logger.error('La contraseña no coincide');
      throw new UnauthorizedException('Credenciales inválidas');
    } */

    // 4. Actualizar último acceso
    try {
      await this.usersService.updateUltimoAcceso(usuario.id_usuario);
    } catch (error: any) {
      this.logger.error(`Error al actualizar último acceso: ${error?.message || error}`);
    }

    // 5. Mapear roles
    const roles = usuario.usuarioRoles?.map((ur: any) => ur.rol?.nombre) || [];

    // 6. Generar Payload y Token
    const payload: JwtPayload = {
      sub: usuario.id_usuario,
      email: usuario.email,
      roles: roles,
    };

    const { password, ...usuarioSinPassword } = usuario;

    this.logger.log(`Login exitoso: ${dto.email}`);

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        ...usuarioSinPassword,
        roles,
      },
    };
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch (error: any) {
      this.logger.error(`Token inválido: ${error?.message || error}`);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}