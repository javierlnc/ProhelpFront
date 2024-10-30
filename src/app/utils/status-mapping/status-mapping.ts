export enum TicketStatus {
  NEW = 'NEW',
  OPEN = 'OPEN',
  ON_HOLD = 'ON_HOLD',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  CANCELLED = 'CANCELED',
  RESOLVED = 'RESOLVED',
}

export const StatusMapping = {
  [TicketStatus.NEW]: 'Nuevo',
  [TicketStatus.OPEN]: 'Abierto',
  [TicketStatus.ON_HOLD]: 'En espera',
  [TicketStatus.PENDING_APPROVAL]: 'Aprovacion Pendiente',
  [TicketStatus.CANCELLED]: 'Cancelado',
  [TicketStatus.RESOLVED]: 'Resuelto',
};
