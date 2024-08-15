# NX Library generator

This is a NX generator for libraries. It follows an opinionated convention also using NX's conventions.

## Tags and scopes

NX uses [enforce module boundaries](https://nx.dev/features/enforce-module-boundaries) to define import rules between projects.

For example, if we have an application for a shop, we might split our application in different libraries, each with a given scope:

- shop (**"scope:shop"**)
- products (**"scope:products"**)
- cart (**"scope:cart"**)
- client (**"scope:client"**)
- help (**"scope:help"**)
- shared (**"scope:shared"**)

Each scope is a library that is imported in the main application and can also import other scopes. But a scope may or may not be able to import another scope. That is where the `enforce module boundaries` comes in.

We could define rules like:

```json
{
  "sourceTag": "scope:products",
  "onlyDependOnLibsWithTags": ["scope:shared", "scope:cart"]
},
```

Meaning that the products library can import the shared library and the cart library but cannot import the client library.

This prevents circular dependencies and makes the codebase more maintainable.

## Types of libraries

Forcing boundaries with only scope is not always enough. Inside a library we can have models, services, components, features, mocks, etc.

For that, we divide libraries not only by scope, but also by type:

- **data-access**: For services to access the api, api mocks, models, related helpers and domain code.
- **feature**: For components that are normally routed and injects related services. Also known as smart components.
- **ui**: For components that are not routed and are used by other components. Known as dumb components.
- **util**: For utility code. Can be forms models, validators, etc.

Now we can apply boundaries not only by scope but also by type. For example:

```json
{
  "sourceTag": "type:feature",
  "onlyDependOnLibsWithTags": ["type:feature", "type:data-access", "type:ui", "type:util"]
},
{
  "sourceTag": "type:ui",
  "onlyDependOnLibsWithTags": ["type:ui", "type:util"]
}
```

A `feature` can access all types but a `ui` can only access `ui` and `util`.

## Usage

To use this generator, you can use either NX Console (> Nx: Generate(ui)) or the terminal:

```bash
npx nx generate @foxandxss/nx-lib-generator:data-access --scope=shop
```
