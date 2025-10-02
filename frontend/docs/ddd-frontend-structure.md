DDD Frontend Structure - Propuesta

Objetivo
Definir una estructura de carpetas orientada a Domain-Driven Design (DDD) para el frontend, preparada para TypeScript/Vue en fases futuras. Separar claramente dominio, casos de uso, adaptadores e interfaces.

Arbol de directorios sugerido (versión inicial):
src/
  domain/                     # Modelos y lógica de negocio por bounded context
    organization/
      model/                  # entidades y value objects del dominio Organización
      aggregate/              # agregados (agrupaciones de entidades)
      services/               # lógica de dominio compleja
      repository/             # interfaces de repositorio
      dto/                    # objetos de transferencia de datos para emitir/recibir
    cultivation/
      model/
      aggregate/
      services/
      repository/
      dto/
    member/
      model/
      aggregate/
      services/
      repository/
      dto/
    parcel/
      model/
      aggregate/
      services/
      repository/
      dto/
    task/
      model/
      aggregate/
      services/
      repository/
      dto/
    plan/
      model/
      aggregate/
      services/
      repository/
      dto/
    payment/
      model/
      aggregate/
      services/
      repository/
      dto/
    user/
      model/
      aggregate/
      services/
      repository/
      dto/
  application/                 # Casos de uso (use cases) y orquestación entre dominios
    usecases/
      organization/
      cultivation/
      member/
      parcel/
      task/
      plan/
      payment/
      user/
    dto/                    # DTOs de aplicación/entrada-salida
  infrastructure/              # Implementación de adaptadores (APIs, storage, etc.)
    api/                    # Adaptadores de API hacia servicios externos (si aplica)
    persistence/            # Puentes de persistencia (localStorage, etc.)
    messaging/              # Colas, eventos, notificaciones (si aplica)
  presentation/                # Capas de UI (futuro)
    components/             # Componentes UI
    pages/                  # Rutas y vistas (si se usa un framework de enrutamiento)
    adapters/               # Adaptadores Presentación <-> Dominio
  shared/                      # Utilidades, tipos, errores comunes
    errors/
    mappings/
    types/
  config/                      # Configuraciones y constantes
tests/                        # Pruebas (unitarias/integración) - por ahora plan de estructura
