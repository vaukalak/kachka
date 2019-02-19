// @flow

// actions

export type FSASuccess<P> = {| type: string, payload: P, error?: false |};
export type FSAError<E> = {| type: string, payload: E, error: true |};
export type FSA<P, E> = FSASuccess<P> | FSAError<E>;

export const ActionMatchers = Object.freeze({
  NAMESPACE_DEFAULT: 'kaczka.NAMESPACE_DEFAULT', // TODO: implement behavior
  NAMESPACE: 'kaczka.NAMESPACE', // TODO: implement behavior
  DEFAULT: 'kaczka.DEFAULT',
});

export type ActionMatcherType = $Values<typeof ActionMatchers>;

// action creators

export type FSACreator<P, E> = {
  (payload: P, isError?: boolean): FSA<P, E>,
  (payload: Error, isError?: boolean): FSA<P, E>,
  (payload: E, isError: true): FSA<P, E>,
  actionType: string,
};

// reducers

export type FSAHandler<S, P, E = Error> = (S, FSA<P, E>) => S;
export type FSASuccessHandler<S, P> = (S, FSASuccess<P>) => S;
export type FSAErrorHandler<S, E = Error> = (S, FSAError<E>) => S;

export type FSAReducer<S> = {
  <P, E>(S, FSA<P, E>): S,
  // withHandler
  withHandler: (<P, E>(FSACreator<P, E>, FSAHandler<S, P, E>) => FSAReducer<S>) &
    (string, FSAHandler<S, *, *>) => FSAReducer<S>,
  withErrorHandler: (<P, E>(FSACreator<P, E>, FSAErrorHandler<S, E>) => FSAReducer<S>) &
    (string, FSAErrorHandler<S, *>) => FSAReducer<S>,
  withSuccessHandler: (<P, E>(FSACreator<P, E>, FSASuccessHandler<S, P>) => FSAReducer<S>) &
    (string, FSASuccessHandler<S, *>) => FSAReducer<S>,
};