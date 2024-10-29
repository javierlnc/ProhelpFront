export interface TicketResponse {
  subject: string;
  requesterName: string;
  status: string;
  id: number;
  description: string;
  priorityId: number;
  assignedTechnicianId: number;
  createdDate: string;
  category: string;
  dueDate: string;
}
