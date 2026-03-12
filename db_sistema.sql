CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    documento VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    ultimo_acceso DATETIME NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL
);

CREATE TABLE rol (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE permiso (
    codigo INT NOT NULL,
    id_permiso INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE accion_historial_movimientos (
    id_historial_accion INT PRIMARY KEY AUTO_INCREMENT,
    nombre_accion VARCHAR(255) NOT NULL
);

CREATE TABLE unidad_medida (
    id_unidad_medida INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    abreviatura VARCHAR(255) NOT NULL
);

CREATE TABLE categoria_insumo (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(255) NOT NULL
);

CREATE TABLE raza (
    id_raza INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE llamar_usuario (
    id_llamar_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    fecha_modificacion DATETIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE usuario_rol (
    id_usuario_rol INT PRIMARY KEY AUTO_INCREMENT,
    id_rol INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE rol_permiso (
    id_rol_permiso INT PRIMARY KEY AUTO_INCREMENT,
    id_permiso INT NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_permiso) REFERENCES permiso(id_permiso),
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

CREATE TABLE insumos (
    id_insumos INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    id_unidad_medida INT NOT NULL,
    id_llamar_usuario INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria_insumo(id_categoria),
    FOREIGN KEY (id_unidad_medida) REFERENCES unidad_medida(id_unidad_medida),
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario)
);

CREATE TABLE historial_insumo (
    id_historial_insumo INT PRIMARY KEY AUTO_INCREMENT,
    id_insumos INT NOT NULL,
    id_historial_accion INT NOT NULL,
    cantidad FLOAT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_insumos) REFERENCES insumos(id_insumos),
    FOREIGN KEY (id_historial_accion) REFERENCES accion_historial_movimientos(id_historial_accion)
);

CREATE TABLE galpon (
    id_llamar_usuario INT NOT NULL,
    id_galpon INT PRIMARY KEY AUTO_INCREMENT,
    codigo_galpon VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    cantidad_max_aves INT NOT NULL,
    fecha_modificacion DATETIME NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    longitud DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario)
);

CREATE TABLE lote (
    id_lote INT PRIMARY KEY AUTO_INCREMENT,
    id_llamar_usuario INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    cantidad_total INT NOT NULL,
    id_raza INT NOT NULL,
    observacion VARCHAR(255) NOT NULL,
    racion_comida VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario),
    FOREIGN KEY (id_raza) REFERENCES raza(id_raza)
);

CREATE TABLE ubicar_gallinas (
    id_ubicar_gallinas INT PRIMARY KEY AUTO_INCREMENT,
    id_llamar_usuario INT NOT NULL,
    id_galpon INT NOT NULL,
    id_lote INT NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario),
    FOREIGN KEY (id_galpon) REFERENCES galpon(id_galpon),
    FOREIGN KEY (id_lote) REFERENCES lote(id_lote)
);

CREATE TABLE estado_lote (
    id_estado_lote INT PRIMARY KEY AUTO_INCREMENT,
    id_lote INT NOT NULL,
    estado VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_lote) REFERENCES lote(id_lote)
);

CREATE TABLE historial_asignacion (
    id_asignacion INT PRIMARY KEY AUTO_INCREMENT,
    id_lote INT NOT NULL,
    id_llamar_usuario INT NOT NULL,
    id_galpon INT NOT NULL,
    cantidad_asignada INT NOT NULL,
    FOREIGN KEY (id_lote) REFERENCES lote(id_lote),
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario),
    FOREIGN KEY (id_galpon) REFERENCES galpon(id_galpon)
);

CREATE TABLE lote_finalizado (
    id_lote_finalizado INT PRIMARY KEY AUTO_INCREMENT,
    id_llamar_usuario INT NOT NULL,
    id_lote INT NOT NULL,
    cantidad INT NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario),
    FOREIGN KEY (id_lote) REFERENCES lote(id_lote)
);

CREATE TABLE gallina_muerta (
    id_gallina_muerta INT PRIMARY KEY AUTO_INCREMENT,
    id_llamar_usuario INT NOT NULL,
    id_lote INT NOT NULL,
    cantidad INT NOT NULL,
    fecha_modificacion DATETIME NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario),
    FOREIGN KEY (id_lote) REFERENCES lote(id_lote)
);

CREATE TABLE tipo_huevo (
    id_tipo INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(255) NOT NULL,
    peso_min DECIMAL(10,2) NOT NULL,
    peso_max DECIMAL(10,2) NOT NULL
);

CREATE TABLE produccion_nuevo (
    id_produccion_nuevo INT PRIMARY KEY AUTO_INCREMENT,
    id_lote INT NOT NULL,
    id_tipo INT NOT NULL,
    cantidad INT NOT NULL,
    fecha_produccion DATETIME NOT NULL,
    FOREIGN KEY (id_lote) REFERENCES lote(id_lote),
    FOREIGN KEY (id_tipo) REFERENCES tipo_huevo(id_tipo)
);

CREATE TABLE inventario_huevo (
    id_inventario INT PRIMARY KEY AUTO_INCREMENT,
    id_tipo INT NOT NULL,
    id_lote INT NOT NULL,
    id_produccion_nuevo INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipo_huevo(id_tipo),
    FOREIGN KEY (id_lote) REFERENCES lote(id_lote),
    FOREIGN KEY (id_produccion_nuevo) REFERENCES produccion_nuevo(id_produccion_nuevo)
);

CREATE TABLE huevo_dañado (
    id_dañado INT AUTO_INCREMENT PRIMARY KEY,
    id_inventario INT NOT NULL,
    cantidad INT NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    CONSTRAINT fk_huevo_daniado_inventario FOREIGN KEY (id_inventario) REFERENCES inventario_huevo(id_inventario)
);

CREATE TABLE historial_huevo (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_inventario INT NOT NULL,
    id_produccion_nuevo INT NOT NULL,
    id_llamar_usuario INT NOT NULL,
    cantidad INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    FOREIGN KEY (id_inventario) REFERENCES inventario_huevo(id_inventario),
    FOREIGN KEY (id_produccion_nuevo) REFERENCES produccion_nuevo(id_produccion_nuevo),
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario)
);

CREATE TABLE alimentacion (
    id_alimentacion INT PRIMARY KEY AUTO_INCREMENT,
    id_llamar_usuario INT NOT NULL,
    id_lote INT NOT NULL,
    id_insumos INT NOT NULL,
    fecha DATETIME NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario),
    FOREIGN KEY (id_lote) REFERENCES lote(id_lote),
    FOREIGN KEY (id_insumos) REFERENCES insumos(id_insumos)
);

CREATE TABLE reporte (
    id_reporte INT PRIMARY KEY AUTO_INCREMENT,
    id_llamar_usuario INT NOT NULL,
    tipo_reporte VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_llamar_usuario) REFERENCES llamar_usuario(id_llamar_usuario)
);