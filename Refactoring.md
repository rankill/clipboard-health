# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

My thoughts were based on the following

- Avoid unnecessary steps
- Reduce complexity and depth of conditions
- Assume default values as soon as possible

The original version had several levels of conditionals that can sometimes lead to difficult reading and possible variable assignment errors, in the new version the conditions were reduced to the maximum, and ternary operators were used to access the correct information.

The default value of candidate in the original version was assigned to it near the end, forcing the system to go through all conditions, even if not required.

The candidate transformation of any data type to `string` is done at the end, so we ensure that the value returned is always a `string`
