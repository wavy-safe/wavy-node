## Guías Generales

Este documento describe las guías de codificación para el proyecto Next.js usando TypeScript. Seguir estas guías asegurará la consistencia y el mantenimiento en todo el código.

### TypeScript

- Usar TypeScript para todos los archivos.
- Todos los archivos deben tener la extensión `.ts` o `.tsx` en caso de ser componentes de React.
- Aprovechar el sistema de tipos de TypeScript para detectar errores de forma temprana.

### Convenciones de Nombres

- **Interfaces:** Usar el formato `ISomething` para los nombres de interfaces (ej., `IUser`, `IProduct`).
- **Nombres de Archivos:** Usar kebab-case para los nombres de archivos (ej., `user-profile.tsx`, `product-list.ts`).
- **Variables:** Usar camelCase para los nombres de variables (ej., `firstName`, `productPrice`).
- **Constantes:** Usar SCREAMING_SNAKE_CASE para los nombres de constantes (ej., `MAX_USERS`, `API_URL`).
- **Funciones:** Usar camelCase para los nombres de funciones (ej., `getUserById`, `calculateTotalPrice`).
- **Componentes:** Usar PascalCase para los nombres de componentes (ej., `UserProfile`, `ProductList`).
- **Clases:** Usar PascalCase para los nombres de las clases (ej., `User`, `Product`).

### Estilo de Código

- **Arrow functions** Preferir usar arrow functions sobre las declaraciones de funciones tradicionales siempre que sea posible.
  ```typescript
  // Preferible
  const add = (a: number, b: number) => a + b;

  // Evitar en la medida de lo posible
  function add(a: number, b: number) {
    return a + b;
  }
  ```
- **Importaciones:** Usar importaciones absolutas para una mejor legibilidad y mantenimiento.
  ```typescript
  // Bien
  import { UserProfile } from '@/components/UserProfile';

  // Mal
  import { UserProfile } from '../../components/UserProfile';
  ```
- **Exportaciones:** Usar exportaciones nombradas para una mejor descubribilidad y tree shaking.
  ```typescript
  // Bien
  export const UserProfile = () => { /* ... */ };

  // Mal
  export default UserProfile;
  ```
- **JSX:** Usar comillas dobles para los atributos JSX.
  ```tsx
  // Bien
  <div className="container">...</div>

  // Mal
  <div class='container'>...</div>
  ```
- **Formateo:** Usar [prettier](https://prettier.io/)

### Estructura de Componentes

- **Componentes Pequeños:** Dividir los componentes grandes en componentes más pequeños y reutilizables.
- **Responsabilidad Única:** Cada componente debe tener una única responsabilidad.
- **Props:** Usar interfaces para definir las props para cada componente.
  ```typescript
  interface IProps {
    user: IUser;
  }

  const UserProfile: React.FC<IProps> = ({ user }) => { /* ... */ };
  ```

### Gestión del Estado

- **Context API:** Usar la Context API para la gestión de estado simple.

### Mejores Prácticas

- **Comentarios de Código:** Agregar comentarios para explicar lógica compleja o código no obvio.
- **Manejo de Errores:** Implementar un manejo de errores adecuado para prevenir caídas inesperadas.
- **Rendimiento:** Optimizar el código para el rendimiento para asegurar una experiencia de usuario fluida.
- **Seguridad:** Seguir las mejores prácticas de seguridad para prevenir vulnerabilidades.

## Adiciones

- **Tipos:** Utilizar tipos específicos en lugar de `any` siempre que sea posible. Esto mejora la legibilidad y el mantenimiento del código.
- **Encadenamiento Opcional y Fusión de Nulos:** Utilizar `?.` y `??` para acceder a propiedades de objetos de forma segura y concisa.
- **Código Duplicado:** Evitar la duplicación de código. Extraer la lógica común a funciones o componentes reutilizables.
- **Legibilidad:** Priorizar la legibilidad del código. Utilizar nombres descriptivos para variables, funciones y componentes.
- **Organización:** Organizar el código en archivos y directorios lógicos. Esto facilita la navegación y el mantenimiento del código.
- **Documentación:** Documentar el código importante. Explicar la lógica compleja o las decisiones de diseño.
- **Consistencia:** Ser consistente con el estilo de código en todo el proyecto.

## Ejemplo de Componente

```tsx
import React from 'react';
import { IUser } from '@/interfaces/user';

interface IProps {
  user: IUser;
}

const UserProfile: React.FC<IProps> = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default UserProfile;
```
