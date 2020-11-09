import { PanelModel } from 'src/views/dashboard/model';
import alertDef from './alertDef';

export class ThresholdMapper {
  static alertToGraphThresholds(panel: PanelModel) {
    for (let i = 0; i < panel.alert.conditions.length; i++) {
      const condition = panel.alert.conditions[i];
      if (condition.type !== 'query') {
        continue;
      }

      const evaluator = condition.evaluator;
      const thresholds: any[] = (panel.options.thresholds = []);

      const anyParam = getEvaluatorAnyParam(evaluator)
      switch (evaluator.type) {
        case 'gt': {
          const value = anyParam.value[0];
          thresholds.push({ value: value, op: 'gt' });
          break;
        }
        case 'lt': {
          const value = anyParam.value[0];
          thresholds.push({ value: value, op: 'lt' });
          break;
        }
        case 'outside_range': {
          const value1 = anyParam.value[0];
          const value2 = anyParam.value[1];

          if (value1 > value2) {
            thresholds.push({ value: value1, op: 'gt' });
            thresholds.push({ value: value2, op: 'lt' });
          } else {
            thresholds.push({ value: value1, op: 'lt' });
            thresholds.push({ value: value2, op: 'gt' });
          }

          break;
        }
        case 'within_range': {
          const value1 = anyParam.value[0];
          const value2 = anyParam.value[1];

          if (value1 > value2) {
            thresholds.push({ value: value1, op: 'lt' });
            thresholds.push({ value: value2, op: 'gt' });
          } else {
            thresholds.push({ value: value1, op: 'gt' });
            thresholds.push({ value: value2, op: 'lt' });
          }
          break;
        }
      }
      break;
    }

    for (const t of panel.options.thresholds) {
      t.fill = true;
      t.line = true;
      t.colorMode = 'critical';
    }

    const updated = true;
    return updated;
  }
}



function getEvaluatorAnyParam(evaluator) {
  for (const param of evaluator.params) {
    if (param.labelName=== alertDef.defaultEvaluatorParamLabel) {
      return param
    }
  }
}