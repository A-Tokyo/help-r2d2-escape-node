agent(0, 0, s).
teleportal(2, 1).
obstacle(1 , 0).
obstacle(0 , 1).
rock(1 , 1, s).
pad(0 , 1).

agent(X, Y, result(A , S)) :-


% THE MOVE HAPPENED

X > -1 , X < 3, Y > -1, Y < 3,

(
 % UP action
( A = up , Y1 is Y + 1 , Y2 is Y - 1 , Y1 < 3,
agent(X, Y1, S) , \+ obstacle(X , Y),
(\+ rock(X, Y, S) ; (Y2 > -1, \+ rock(X, Y2 , S), \+ obstacle(X , Y2)))
)
;
%DOWN action
( A = down , Y1 is Y - 1 , Y2 is Y + 1 , Y1 > -1,
agent(X, Y1, S) , \+ obstacle(X , Y),
( \+ rock(X, Y, S) ; (Y2 < 3, \+ rock(X, Y2 , S), \+ obstacle(X , Y2)))
)
;
%LEFT action
( A = left , X1 is X + 1 , X2 is X - 1 , X1 < 3,
agent(X1, Y, S) , \+ obstacle(X , Y),
( \+ rock(X, Y, S) ; (X2 > -1, \+ rock(X2, Y , S), \+ obstacle(X2 , Y)))
)
;
%RIGHT action
( A = right , X1 is X - 1 , X2 is X + 1 , X1 > -1,
agent(X1, Y, S) , \+ obstacle(X , Y),
( \+ rock(X, Y, S) ; (X2 < 3, \+ rock(X2, Y , S), \+ obstacle(X2 , Y)))
)
)

.

% ROCK AXIOMS
rock(X , Y , result(A , S))  :-
                                        % A Change Happened and the Rock moved
X > -1 , X < 3, Y > -1, Y < 3,
(
(
( A = up, Y1 is Y + 1, Y2 is Y + 2, Y1 < 3, Y2 < 3,
rock(X , Y1 , S), \+ obstacle(X, Y), \+ rock(X, Y , S), agent(X, Y2 , S) )
;
( A = down,Y1 is Y - 1,Y2 is Y - 2, Y1 > -1, Y2 > -1,
rock(X , Y1 , S), \+ obstacle(X, Y), \+ rock(X, Y , S), agent(X, Y2 , S) )
;
( A = left, X1 is X + 1, X2 is X + 2, X1 < 3, X2 < 3,
rock(X1 , Y , S), \+ obstacle(X, Y), \+ rock(X, Y , S), agent(X2, Y , S) )
;
( A = right, X1 is X - 1, X2 is X - 2, X1 >= 0, X2 >= 0,
rock(X1 , Y , S), \+ obstacle(X, Y), \+ rock(X, Y , S), agent(X2, Y , S) )
)
;
(                           % A Change didn't Happen and the Rock didn't move
(A = up, Y1 is Y - 1, Y2 is Y + 1, rock(X , Y , S),
( Y1 < 0 ; Y2 > 2 ; obstacle(X , Y1) ; rock(X , Y1 , S) ; \+ agent(X , Y2, S) ) )
;
(A = down, Y1 is Y + 1, Y2 is Y - 1, rock(X , Y , S),
( Y1 > 2 ; Y2 < 0 ; obstacle(X , Y1) ; rock(X , Y1 , S) ; \+ agent(X , Y2 , S)) )
;
(A = left, X1 is X - 1, X2 is X + 1, rock(X , Y , S),
( X1 > 2 ; X2 < 0 ; obstacle(X1 , Y) ; rock(X1 , Y , S) ; \+ agent(X2 , Y , S)) )
;
(A = right, X1 is X + 1, X2 is X - 1, rock(X , Y , S),
( X1 > 2 ; X2 < 0 ; obstacle(X1 , Y) ; rock(X1 , Y , S) ; \+ agent(X2 , Y , S)) )
)
).

agentandrock(X , Y , X2 , Y2 , S) :-
agent(X ,Y , S) , rock(X2 , Y2 , S).


generate(X,Y,S,N):-
 ((call_with_depth_limit(agent(X,Y,S),N,Z)), \+Z=depth_limit_exceeded)
 ;(( call_with_depth_limit(agent(X,Y,S),N,depth_limit_exceeded)), N1 is N+1,generate(X,Y,S,N1)).


generateboth(X,Y,X2,Y2,S,N):-
  ((call_with_depth_limit(agentandrock(X,Y , X2 , Y2,S),N,Z)), \+Z=depth_limit_exceeded)
  ;(( call_with_depth_limit(agentandrock(X,Y , X2 , Y2,S),N,depth_limit_exceeded)), N1 is N+1,generateboth(X,Y,X2,Y2,S,N1)).
