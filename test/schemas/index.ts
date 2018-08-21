import * as I from '../../src/interface/index';

interface TestCase {
  value: any;
  errKeyword?: string;
}

interface TestConfig {
  name: string;
  schema: I.GateSchemaBase;
  pass?: TestCase[];
  fail?: TestCase[];
}
export default function testSchema(testConfig: TestConfig) {
  const name = testConfig.name;
  const schema = testConfig.schema;
  const pass = testConfig.pass || [];
  const fail = testConfig.fail || [];

  pass.forEach((item: TestCase, index: number) => {
    test(`${name} pass: ${index}`, () => {
      schema.validate(item.value, (err: I.ValidationError) => {
        expect(err).toBeFalsy();
      });
    });
  });
  fail.forEach((item: TestCase, index: number) => {
    test(`${name} fail: ${index}`, () => {
      schema.validate(item.value, (err: I.ValidationError) => {
        expect(err).toBeTruthy();
        if (item.errKeyword) {
          expect(err.keyword).toBe(item.errKeyword);
        }
      });
    });
  });
}
