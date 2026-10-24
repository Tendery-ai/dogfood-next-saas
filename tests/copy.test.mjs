import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const pricing = read('components/ui/Pricing/Pricing.tsx');
const layout = read('app/layout.tsx');
const landing = read('app/page.tsx');
const fixtures = JSON.parse(read('fixtures/stripe-fixtures.json'));
const products = fixtures.fixtures
  .filter((f) => f.path === '/v1/products')
  .map((f) => f.params);

test('landing page renders the shared pricing component', () => {
  assert.match(landing, /<Pricing\b/);
});

test('headline and subheadline tell the small-team story', () => {
  assert.match(pricing, /Simple pricing for small teams/);
  assert.match(pricing, /Pick the plan that fits how your team works/);
  assert.doesNotMatch(pricing, /Pricing Plans/);
});

test('site title and description match the headline story', () => {
  assert.match(layout, /const title = 'Simple pricing for small teams'/);
  assert.match(layout, /Pick the plan that fits how your team works/);
  assert.doesNotMatch(layout, /Subscription Starter/);
});

test('every plan button uses the same wording', () => {
  const buttons = pricing.match(/<Button\b[\s\S]*?<\/Button>/g) ?? [];
  assert.ok(buttons.length > 0);
  for (const button of buttons) assert.match(button, />\s*Get started\s*</);
  assert.doesNotMatch(pricing, /Subscribe|'Manage'/);
});

test('plans are named and described by who they are for, in words only', () => {
  assert.deepEqual(
    products.map((p) => p.name),
    ['Solo', 'Small Team']
  );
  for (const p of products) {
    assert.match(p.description, /^For /);
    assert.doesNotMatch(p.description, /\d/, 'no numbers');
    assert.doesNotMatch(p.description, /support/i, 'no support claims');
  }
});

test('the highlighted default plan is a plan that exists', () => {
  const m = pricing.match(/product\.name === '([^']+)'\s*\n?\s*\}/);
  assert.ok(m, 'default plan check found');
  assert.ok(products.some((p) => p.name === m[1]));
});
