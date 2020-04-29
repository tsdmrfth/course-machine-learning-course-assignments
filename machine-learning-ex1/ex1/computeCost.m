function J = computeCost(X, y, theta)

m = length(y);
prediction = X * theta;
J=1 / (2*m) * ((prediction - y)') * (prediction - y)

end