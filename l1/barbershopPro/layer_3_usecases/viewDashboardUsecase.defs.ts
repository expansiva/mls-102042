export const viewDashboardUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "viewDashboardUsecase",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseEntities",
    "stepId": 51,
    "planId": "plan-index-critic:usecasePlan:1"
  },
  "data": {
    "backendArchitecture": {
      "pattern": "layered",
      "layer1Responsibility": "Persist external and module-owned tables, including metrics tables in layer_1_external.",
      "layer2Responsibility": "Expose controllers/BFF endpoints that must call layer_3_usecases and never access tables directly.",
      "layer3Responsibility": "Implement business use cases, enforce rules, and be the only layer that reads/writes layer_1_external tables."
    },
    "controllerRules": {
      "bffMustCallUsecases": true,
      "bffDirectTableAccessForbidden": true
    },
    "usecase": {
      "usecaseId": "viewDashboardUsecase",
      "title": "View dashboard",
      "purpose": "Load operational KPIs and summaries for the dashboard.",
      "actor": "owner",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "Appointment",
        "Sale",
        "StaffMember"
      ],
      "outputEntities": [
        "Appointment",
        "Sale",
        "StaffMember"
      ],
      "readsTables": [
        "operations_metrics",
        "performance_metrics",
        "appointment",
        "sale",
        "staff_member"
      ],
      "writesTables": [],
      "commands": [
        "viewDashboard"
      ],
      "rulesApplied": [
        "singleLocationScope"
      ]
    }
  }
} as const;

export default viewDashboardUsecaseUsecasePlan;
