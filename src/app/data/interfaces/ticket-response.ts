export interface TicketResponse {
  subject: string;
  requesterName: string;
  id: number;
  description: string;
  priorityId: number;
  assignedTechnicianId: number;
  createdDate: string;
  category: string;
  dueDate: string;
}
