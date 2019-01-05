// @flow
import { expect } from 'chai';
import { createDuck } from '../lib';

describe('defineAction', () => {
  const duck = createDuck('define-action-test');
  const foo = duck.defineAction('FOO');

  it('action creator should contain namespaced ACTION_TYPE field', () => {
    expect(foo.ACTION_TYPE).to.equal('define-action-test/FOO');
  });

  it('action type should be namespaced', () => {
    expect(foo().type).to.equal('define-action-test/FOO');
  });

  it('action.error should be true, when payload is Error', () => {
    expect(foo(new Error()).error).to.equal(true);
  });

  it('action.error should be false, when explicitly specified', () => {
    expect(foo(new Error(), false).error).to.equal(false);
  });

  it('action.error should be true when explicitly specified', () => {
    expect(foo({}, false).error).to.equal(false);
  });
});
