# Changelog

## [v0.2.0](https://github.com/ClementNerma/SilverNight-draft/commit/018e2254a41f99300c6eb27ac90d4c05b507ccf2)

* Rename most number types
* Introduce the `usize` type to handle indexes
* Introduce number type suffixes
* Introduce numbers type hierarchy (`i8` is a sub-type of `i16`...)
* Make number types incompatible between them (except parent and children)
* Remove logical operators aliases on values (`is`, `isnt`, `and`, `or`, `not`)
* Rename one's complement operator to `~~`
* Fix: type inference for dictionary types (lists, maps)
* Make structures' fields constant by default
* Introduce plain structure fields
* Remove structures' fields mutability compatibility (e.g. cannot use a constant field where a mutable is expected)
* Introduce optional structures' fields
* Make tuples' fields constant by default
* Introduce plain tuple fields
* Remove tuples' fields mutability compatibility (e.g. cannot use a constant field where a mutable is expected)
* Introduce convention: write the structure's name before instanciating it as an object
* Change the `#dict;` directive to the `#` symbol
* Make Inferred Structured Typing more clear
* Remove parenthesis from blocks' head
* Force to use brackets to delimit blocks' body
* Add the `unless` block
* Allow `for` loops to accept any instruction in their head
* Always generate a list with inline generation
* Do not perform inline generation if not wrapped between parenthesis
* Rename the _global scope_ to the _main scope_
* Explicit how `for`'s iterator is located in its body's scope
* Remove the `@argument` notation from methods
* Introduce the `ComparableTo<T>` interface
* Forbid structures from being classes' friends
* Make the `super` keyword referring to the current class' mother as an instance
* Dedicate a special type for the current class' mother reference (`_super`)
* Require the `%` symbol to call a class' overload
* Do not inherit constructors in classes
* Make classes not inheritable (sealed) by default
* Introduce opened classes (inheritable classes)
* Remove final classes
* Remove read-only classes
* Update the syntax for unique classes
* Introduce final methods
* Introduce safe typecasting
* Introduce typecasting overloads
* Remove freezable entities
* Remove the `Freezable` interface
* Introduce long safe typecasting
* Introduce type extensions
* Introduce void-templating (and template ambiguity)
* Introduce the type-checking operator `~`
* Introduce templates in lambdas
* Allow class segments to implement interfaces an use traits
* Introduce the `keyof` operator
* Remove the shortened syntax for dictionary types
* Make the `in` operator looking for values instead of keys
* Introduce constructable attributes (`#future`)
* Update the `Error` class
* Make tuples a primitive type
* Make pointers not nullable by default
* Remove dynamic typecasting
* Replace the `fly_ptr!` and `fly_mut_ptr!` flexs
* Introduce the `wrap!` flex
* Remake bindings syntax
* Update reduced functions syntax
* Introduce the `typeof_ref!`, `iter_ref!`, `levelof!` flexs
* Drop support for the value item in proxies
* Require an explicit type for proxy models
* Introduce templated proxies
* Introduce flexible proxies
* Introduce plainable types
* Introduce descriptor types
* Introduce unsafe typecasting
* Introduce type assertion
* Introduce intersection types
* Introduce union types
* Introduce union values
* Introduce anonymous classes
* Introduce error-free promises
* Remove the old promises chaining syntax
* Introduce promises chaining
* Introduce promises synchronisation (with the new `sync` keyword)
* Introduce most documentation comments

## [v0.0.0](https://github.com/ClementNerma/SilverNight-draft/commit/2168cc849a1207b80629acfb0c3fab879cdbeee3) - [v0.1.0](https://github.com/ClementNerma/SilverNight-draft/commit/65fa064ae29f633cd36197f87c9120f7b56ea0f7)

* Introduce the concept of toolchain
* Introduce the concept of builder
* Introduce the concept of optimizer
* Introduce comments
* Introduce mutables
* Introduce constants
* Introduce plain constants
* Introduce primitive types
* Introduce object types
* Introduce number types (integers, floating-point)
* Introduce explicit typing with suffix for floating-point numbers
* Introduce syntax for alternative number bases
* Introduce underscore separator for numbers
* Introduce overflows and underflows
* Introduce mathematical operators
* Introduce incremental operators
* Introduce bitwise operators
* Introduce logical operators
* Introduce assignment operators
* Introduce the concatenation operators
* Introduce vectors (arrays, lists)
* Introduce templated types
* Introduce tuples
* Introduce structures
* Introduce constant fields in structures
* Introduce tuple structures
* Introduce dictionaries (collections, maps)
* Introduce Inferred Structured Typing
* Introduce syntax to infer dictionary structure
* Introduce the multiple assignments syntax
* Introduce conditional blocks (`if`, `else`, `elsif`)
* Introduce loops (`for`, `while`, `until`, `do`..`while`, `loop`)
* Introduce matches
* Introduce ternary conditions
* Introduce inline blocks
* Introduce inline generation
* Introduce loops breaking (`break`)
* Introduce loops continuation (`continue`)
* Introduce block-scoped entities
* Introduce global scope
* Introduce functions
* Introduce optional arguments
* Introduce infinite arguments
* Introduce arguments expansion
* Introduce lambdas
* Introduce Inferred Callback Typing
* Introduce polymorphism
* Introduce classes (members, attributes, methods)
* Introduce members accessibility
* Introduce overloads
* Introduce the constructor
* Introduce read-only attributes
* Introduce static members
* Introduce the `@` entity as an alias of `this.`
* Introduce resolution keywords
* Introduce the `this` keyword ot refer to the real class as an instance
* Introduce the `self` keyword to refer to the current class as an instance
* Introduce the `super` keyword to refer to the current class' mother as an instance
* Introduce the `_this` type to refer to the real class
* Introduce the `_self` type to refer to the current class
* Introduce the `_super` type to refer to the current class' mother
* Introduce the destructor
* Introduce freeing
* Introduce cloning
* Introduce the cloning overload
* Introduce lazy overloads
* Introduce serialization
* Introduce the serialization overload
* Introduce the unserialization overload
* Introduce the inline call overload (static + non-static)
* Introduce operators overloads
* Introduce templates
* Introduce classes' friends
* Introduce the concept of cross-typing
* Introduce inheritance
* Introduce sub-typing with inheritance
* Introduce manual overloads call
* Introduce abstract methods
* Introduce virtual classes
* Introduce final classes
* Introduce static classes
* Introduce unique classes
* Introduce read-only classes
* Introduce typecasting overloads
* Introduce interfaces
* Introduce self-references in interfaces
* Introduce native typecasting interfaces
* Introduce the `Any` interface
* Introduce traits
* Introduce optional templates
* Introduce restricting templates
* Introduce restrictions on templates
* Introduce dynamic return types
* Introduce templates as instances
* Introduce class segments
* Introduce dictionary classes
* Introduce static templates
* Introduce iterators
* Introduce iterator functions
* Introduce the `for`..`of` loop to iterate a dictionary's keys
* Introduce the `for`..`in` loop to iterate a dictionary's values
* Introduce the `for [key] -> [arrow]` loop to iterate a dictionary
* Introduce the `in` keyword to look for a key in a dictionary
* Introduce collections
* Introduce shortened typing for dictionaries
* Introduce nullable types
* Introduce nullable types' automatic typecasting
* Introduce manual nullables typecasting
* Introduce really optional arguments
* Introduce nullable members in structures
* Introduce the nullable operator
* Introduce errors
* Introduce errors catching (`try`, `catch`)
* Introduce cleaning after errors catching (`finally`)
* Introduce custom errors
* Introduce inline catching
* Introduce the Object Identifier (OID)
* Introduce the Object-Entity Sharing Model (OESM)
* Introduce references
* Introduce pointers
* Introduce depointerization
* Introduce references on values (`fly_ptr!`, `fly_mut_ptr!`)
* Introduce pointers compatibility
* Introduce the `NULL` pointer
* Introduce static typecasting
* Introduce dynamic typecasting
* Introduce scope dropping
* Introduce pointer checking
* Introduce independance between the pointer's state and its referred's one
* Introduce multiple-level pointers
* Introduce bindings
* Introduce prepared bindings objects
* Introduce constrained types
* Introduce conditional directives
* Introduce superoverloads
* Introduce the reduction directive (reduced functions)
* Introduce flexs
* Introduce proxies
* Introduce prepared proxy objects
* Introduce promises
* Introduce asynchronous functions
* Introduce promises chaining
* Introduce the `await` keyword to wait asynchrously for promises
* Introduce documentation comments
* Introduce packages
* Introduce the `import!` flex
* Introduce modules
* Introduce sub-modules
* Introduce namespaces
* Introduce sub-namespaces
* Introduce the `\` symbol to access the top-level namespace
