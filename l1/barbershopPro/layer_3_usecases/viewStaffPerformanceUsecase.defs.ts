export const viewStaffPerformanceUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "viewStaffPerformanceUsecase",
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
      "usecaseId": "viewStaffPerformanceUsecase",
      "title": "View staff performance",
      "purpose": "Load staff KPIs and commission summaries.",
      "actor": "manager",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "Sale",
        "StaffMember",
        "CommissionRule"
      ],
      "outputEntities": [
        "Sale",
        "StaffMember",
        "CommissionRule"
      ],
      "readsTables": [
        "performance_metrics",
        "sale",
        "staff_member",
        "commission_rule"
      ],
      "writesTables": [],
      "commands": [
        "viewStaffPerformance"
      ],
      "rulesApplied": [
        "commissionCalculationRequired",
        "singleLocationScope"
      ]
    }
  }
} as const;

export default viewStaffPerformanceUsecaseUsecasePlan;
