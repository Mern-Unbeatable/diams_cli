/**
 * Basic demo records for auditLogs.
 */
export const AUDIT_LOGS_MOCK = [
  {
    "id": "log-1",
    "actor": "admin@novasky.ch",
    "action": "order.update",
    "target": "ord-1",
    "at": "2026-08-07T10:00:00Z"
  },
  {
    "id": "log-2",
    "actor": "collab@novasky.ch",
    "action": "customer.view",
    "target": "cus-2",
    "at": "2026-08-07T11:00:00Z"
  }
];
