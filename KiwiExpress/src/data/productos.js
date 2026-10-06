//servicios de envio que ofrece kiwiexpress, hacen de productos de la tienda
//por ahora estan aca, mas adelante van a salir de una base de datos

export const productos = [
  {
    id: 1,
    codigo: "KX-ENV-01",
    nombre: "Envío estándar",
    descripcion: "Entrega en 3 a 5 días hábiles dentro de la Región Metropolitana.",
    precio: 3990,
    stock: 50,
    stockCritico: 10,
    categoria: "No Frágil",
    imagen: "/img/envio-estandar.png",
    enOferta: false,
    precioOferta: 0
  },
  {
    id: 2,
    codigo: "KX-ENV-02",
    nombre: "Envío express",
    descripcion: "Entrega al día siguiente en las comunas de la Región Metropolitana.",
    precio: 6990,
    stock: 30,
    stockCritico: 10,
    categoria: "No Frágil",
    imagen: "/img/envio-express.png",
    enOferta: true,
    precioOferta: 5490
  },
  {
    id: 3,
    codigo: "KX-FRA-01",
    nombre: "Envío de paquete frágil",
    descripcion: "Embalaje reforzado y manejo cuidadoso para vidrios, cerámica y electrónica.",
    precio: 8990,
    stock: 20,
    stockCritico: 5,
    categoria: "Frágil",
    imagen: "/img/envio-fragil.png",
    enOferta: false,
    precioOferta: 0
  },
  {
    id: 4,
    codigo: "KX-EMB-01",
    nombre: "Caja de embalaje mediana",
    descripcion: "Caja de cartón corrugado de 30x30x30 cm para preparar tu envío.",
    precio: 1990,
    stock: 120,
    stockCritico: 25,
    categoria: "No Frágil",
    imagen: "/img/caja-mediana.png",
    enOferta: false,
    precioOferta: 0
  },
  {
    id: 5,
    codigo: "KX-EMB-02",
    nombre: "Kit de embalaje frágil",
    descripcion: "Incluye burbuja, relleno y cinta de advertencia para paquetes delicados.",
    precio: 4490,
    stock: 8,
    stockCritico: 15,
    categoria: "Frágil",
    imagen: "/img/kit-fragil.png",
    enOferta: true,
    precioOferta: 3490
  },
  {
    id: 6,
    codigo: "KX-SEG-01",
    nombre: "Seguro de envío",
    descripcion: "Cubre el valor declarado del paquete hasta 400.000 pesos.",
    precio: 2990,
    stock: 100,
    stockCritico: 20,
    categoria: "No Frágil",
    imagen: "/img/seguro.png",
    enOferta: false,
    precioOferta: 0
  },
  {
    id: 7,
    codigo: "KX-ENV-03",
    nombre: "Retiro a domicilio",
    descripcion: "Un operario retira el paquete en la dirección que nos indiques.",
    precio: 2490,
    stock: 40,
    stockCritico: 10,
    categoria: "No Frágil",
    imagen: "/img/retiro.png",
    enOferta: false,
    precioOferta: 0
  },
  {
    id: 8,
    codigo: "KX-FRA-02",
    nombre: "Envío frágil express",
    descripcion: "Entrega al día siguiente con embalaje reforzado para paquetes delicados.",
    precio: 11990,
    stock: 4,
    stockCritico: 8,
    categoria: "Frágil",
    imagen: "/img/fragil-express.png",
    enOferta: true,
    precioOferta: 9990
  }
];

export const categorias = [
  { id: 1, nombre: "Frágil", descripcion: "Servicios para paquetes que necesitan manejo cuidadoso." },
  { id: 2, nombre: "No Frágil", descripcion: "Servicios para paquetes de manejo estándar." }
];

export const usuarios = [
  { id: 1, run: "123456789", nombre: "Catalina", apellidos: "Soto", correo: "catalinasoto@gmail.com", contrasena: "ctr123", comuna: "Providencia", rol: "cliente" },
  { id: 2, run: "987654321", nombre: "Diego", apellidos: "López", correo: "diegolopez@gmail.com", contrasena: "ctr456", comuna: "Las Condes", rol: "cliente" },
  { id: 3, run: "112223334", nombre: "Rodrigo", apellidos: "Fuentes", correo: "rodrigofuentes@duoc.cl", contrasena: "admin123", comuna: "Santiago", rol: "administrador" },
  { id: 4, run: "445556667", nombre: "Javiera", apellidos: "Díaz", correo: "javieradiaz@duoc.cl", contrasena: "oper123", comuna: "Ñuñoa", rol: "operario" }
];
