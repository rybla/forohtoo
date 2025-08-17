bun --env-file=.env.test run --filter "*" lint &&
bun --env-file=.env.test run --filter "*" check &&
bun --env-file=.env.test run --filter "*" build &&
echo "\n\n\nEverything looks ok! You may commit your changes now.";
