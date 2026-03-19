import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ access_token: string; usuario: object }> {
    const usuario = await this.usersService.findByEmail(dto.email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo. Contacte al administrador');
    }

    const passwordMatch = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar último acceso
    await this.usersService.updateUltimoAcceso(usuario.id_usuario);

    // Extraer nombres de roles para el JWT
    const roles = usuario.usuarioRoles?.map((ur) => ur.rol?.nombre ?? '') ?? [];

    const payload: JwtPayload = {
      sub: usuario.id_usuario,
      email: usuario.email,
      roles,
    };

    const { password, ...usuarioSinPassword } = usuario;

    return {
      access_token: this.jwtService.sign(payload),
      usuario: { ...usuarioSinPassword, roles },
    };
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
