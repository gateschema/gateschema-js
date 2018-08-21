import * as I from '../src/interface/index';
import msgs from '../src/msgs';

interface TestCase {
  schema: I.GateSchemaBase;
  pass: any[];
  fail: any[];
}
export interface TestCaseConfig {
  name: string;
  cases: TestCase[];
}

export function runTest(testConfig: TestCaseConfig) {
  testConfig.cases.forEach(({ schema, pass, fail }) => {
    pass.forEach((item: any) => {
      test(`${testConfig.name} pass: ${JSON.stringify(item)}`, () => {
        schema.validate(item, (err: any) => {
          expect(err).toBeFalsy();
        });
      });
    });
    fail.forEach((item: any, index) => {
      test(`${testConfig.name} fail: ${JSON.stringify(item)}`, () => {
        schema.validate(item, (err: I.ValidationError) => {
          expect(err).toBeTruthy();
          expect(msgs).toHaveProperty(err.msgParams.KEY);
        });
      });
    });
  });
}
