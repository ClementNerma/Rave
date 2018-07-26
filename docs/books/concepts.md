# The Book of Concepts

## Foreword

Welcome to the SilverNight's _Book of Concepts_. This book aims to provide a detailed view of how the language works, as well as the tools coming with it, and act as a specification document. This document presents many technical aspects and is NOT designed to be a tutorial.

If you are looking for a tutorial or for the detailed functioning of the language, you should read [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) instead.

Also, this book will not introduce the language's toolchain, another book will be published soon about it.

**WARNING: Please note this language is not finished yet ; some features could and WILL be added, modified or removed at anytime. It's still a draft at this point and no feature or syntax is frozen.**

## Introduction

### Comments

Comments can either be single-line, starting with a double-slash (`//`). Everything after these two symbols will be considered as a comment.

```sn
// This is a comment
```

They can also be multi-line, starting with a `/*` and ending with a `*/`. Everything between these two groups of symbols will be considered as a comment.

```sn
/*
  This is
  a very nice
  multi-line
  comment
*/
```

### Build process

The _builder_ is a part of the toolchain that takes a SilverNight source code as an input and analyzes it to look for any error and to (optionally) optimize it.

The _build time_ is the moment where the builder analyzes and (optionally) optimizes it.

### Notations

In this book, we will use several notations both in the text and in code examples. Here is the list:

* An `// e.g.` comment alone in a line indicates that an example of the current concept is given just below it ;
* An `// ERROR` comment indicates the current line will result in an error ;
* An `// Works` comment indicates the current line works as expected in an ambuiguous context
* An _invalid code_ is a code that result in an error when we try to give it to the builder

## Values

_Values_ are individual data that can be processed using _expressions_ or _value operators_. Each value has an associated _type_ describing it.

A value can either be a _primitive_ or an _object_.

Primitives are the only type of value that is immutable, meaning their content can never change.

Also, values can be written as _raw values_ or as _unpredictable values_. The first ones are explicit values, meaning they are predictable and won't change whatever happens. The second ones can depend on the program's state. In this chapter, we will only talk about raw values.

### Voids, booleans and numbers

Voids' type is `void`. There is only one possible void value: `null`.

Booleans' type is `bool`. They are only two possible boolean values: `true` and `false`.

Numbers have numerous types, divided into two families: the integers, and the floating-point numbers.

### Integers

Each integer type has a minimum value and a maximum value. Here is the list (the comma symbol is simply a separator for thousands and must be ignored):

|  Type   |            Minimum           |            Maximum           |
|---------|------------------------------|------------------------------|
| `i8`    | `-128`                       | `127`                        |
| `u8`    | `0`                          | `255`                        |
| `i16`   | `-32,768`                    | `32,767`                     |
| `u16`   | `0`                          | `65,535`                     |
| `i32`   | `−2,147,483,648`             | `2,147,483,647`              |
| `u32`   | `0`                          | `4,294,967,295`              |
| `i64`   | `-9,223,372,036,854,775,808` | `9,223,372,036,854,775,807`  |
| `u64`   | `0`                          | `18,446,744,073,709,551,615` |

Integer types starting with an `i` are signed integers, meaning they can handle some negative numbers, while types starting with an `u` are unsigned integers, meaning they can only handle positive numbers.

The number following the first letter of the type indicates how must bits it takes in memory.

Raw integers are a suite of digits from `0` to `9`, optionally separated by underscores (_) which are separators and are ignored. Note that numbers cannot start or end with an underscore symbol.

There are two "default" types for integers: `int`, which is an alias for `i32`, and `uint`, which is an alias for `u32`.

When writing a number without providing a type, it's by default an `int`. If it exceeds its capacity, it is turned into the smallest that can handle it:

```sn
2_147_483_647 // i32
2_147_483_648 // u32

4_294_967_295 // u32
4_294_967_296 // i64
```

### Floating-point numbers

Each floating-point type has a minimum value, a maximum value as well as a precision expressed in a number of decimals. Here is the list (the comma symbol is simply a separator for thousands and must be ignored):

|  Type   |      Minimum      |      Maximum      |     Precision     |
|---------|-------------------|-------------------|-------------------|
|  `f32`  | `~ 1.2 * 10^-38`  | `~ 3.4 * 10^+38`  | 6 decimals        |
|  `f64`  | `~ 2.3 * 10^-308` | `~ 1.7 * 10^+308` | 15 to 17 decimals |

All floating-point types are signed.

The number following the first letter of the type indicates how must bits it takes in memory.

Raw integers are a suite of digits from `0` to `9`, optionally separated by underscores (_) which are separators and are ignored.

This is their _integer part_, which is followed by a point (.) and another equivalent suite representing their _decimal part_.

When writing a floating-point number without providing a type, it's by default an `f32`. If it exceeds its capacity, it is turned into an `f64`.

By default, any raw number without a decimal part is considered as being an integer. If it has a decimal part, even if it's a suite of zeros, it is considered as being a floating-point number.

### Numerical suffixes

Raw numbers can be followed with a _numerical suffix_, which allows them to be of another number type:

```sn
[raw number][suffix]

// e.g.
2b;  // i8 (Byte)
2ub; // u8 (Unsigned Byte)
2s;  // i16 (Short)
2us; // u16 (Unsigned Short)
2;   // i32
2u;  // u32 (Unsigned)
2l;  // i64 (Long)
2ul; // u64 (Unsigned Long)
2f;  // f32 (Float)
2d;  // f64 (Double)
```

### Strings

Strings start either by a single quote (') or a double quote (") which is their _wrapper symbol_ and must terminate with the same symbol. They contain a suite of printable characters, except their wrapper symbol and line breaks. Their type is `string`.

```sn
let hello: string = 'Hello world!';
```

To include a line break or the wrapper symbol, it must be _escaped_ by prefixing it with a backslash (`\`):

```sn
let hello: string = 'Hello \'world\'!";
let world: string = 'Line 1\nLine 2';
```

Note that strings can be empty:

```sn
let empty: string = '';
```

Strings can also be written on multiple lines by using the backquote (`) wrapper:

```sn
let hello: string = `Line 1
Line 2
Line 3`;

// Equivalent to:
let hello: string = 'Line 1\nLine 2\nLine 3';
```

### NIL values

NIL values are either `null`, `false`, `0` or `""` (empty string).

## Entities and expressions

An _entity_, also called _resource_, can either be a _container_ or a _model_. Its name must be start by a letter (any case), an underscore symbol (_) or a dollar symbol ($). It may be followed by one or several letters (any case), underscore symbols, dollar symbols or digits.

Entities must be _declared_ using a _keyword_ (which is a suite of lowercase letters) specific to each type of entity (there are several types of containers and descriptors), followed by their name, then by a specific depending on if the entity is a container or a descriptor.

Each entity can be used as a value.

### Containers

Containers have a type and contain a value described as their _content_. The action of setting a container's content is called _assignment_. Be aware though, containers are not values themselves, they simply contain one (and only one).

#### Mutables

Mutable containers can have a dynamic content, meaning we can perform several assignment separetly on them. They are defined using the `let` keyword:

```sn
let [name]: [type];

// e.g.
let age: uint;
```

This declaration implicitly assigns the default type's value (which is `0` here) to the `age` mutable.

Assignments can be performed this way:

```sn
[name] = [value];

// e.g.:
age = 5;
```

Note that assignments must respect the mutable's type. For example, the following code is not valid:

```sn
let age: uint;

age = "Hello"; // ERROR
```

Also, containers can receive a value at declaration time. It's called an _initialization_:

```sn
let [name]: [type] = [value];

// e.g.
let age: uint = 5;
```

Here, `5` is the mutable's _initialization value_.

#### Constants

Constants are declared like mutables, but using the `val` keyword:

```sn
val [name]: [type] = [value];

// e.g.
val age: uint = 5;
```

Note that constants require an initialization value, so the following code isn't valid:

```sn
val age: uint;
```

Also, constants cannot be assigned twice:

```sn
val age: uint = 5;

age = 8; // ERROR
```

Finally, constants are mutables that can cannot be assigned twice and require an initialization value.

#### Plain constants

Plain constants are constants with a predictable value, meaning that the value won't change whatever the execution conditions are and what the other contains contain. Otherwise, they work exactly like constants and are declared using the `pln` keyword:

```sn
pln age: uint = 5;
```

### Models

Models are entities that describes objects. As for entities, they are several types of models.

A _structure_, declared with the `struct` keyword followed by its name, is a model describes an object as a set of _fields_, which are entities (implicitly mutables).

```sn
struct [name] {
  [field1]: [type1];
  [field2]: [type2];
  ...
  [fieldN]: [typeN];
}

// e.g.
struct Hero {
  name: string;
  hp: uint;
}
```

Any container can now have the `Hero` type. They can be declared like this:

```sn
[container]: [type] = [type] {
  [field1]: [value1],
  [field2]: [value2],
  ...
  [fieldN]: [valueN]
};

// e.g.
let hero: Hero = Hero {
  name: "Jack",
  hp: 100
};
```

The first `Hero` word indicates the mutable's type. The second one indicates we are _instanciating_ the structure.

Note that fields can be put in any order during instanciation. Though, all the fields of the structure must be initialized.

Our mutable is an object, and we can use its fields by writing the object's name, followed by a point (.) and the field's name:

```sn
hero.name = "John"; // Works
hero.hp   = 200; // Works
```

Each field of the object is an entity itself, which can be used as it.

By default, a structure field is implicitly a mutable. Though, we prefix it with the `val` keyword to make it constant:

```sn
struct Hero {
  val name: string;
  hp: uint;
}

let hero: Hero = Hero {
  name: "Jack",
  hp: 100
};

hero.hp   = 200; // Works
hero.name = "John"; // ERROR
```

They can even be plain constants, by using the `pln` keyword:

```sn
struct Hero {
  pln name: string;
  hp: uint;
}

let hero: Hero = Hero {
  name: "Jack", // Works
  hp: 100
};

val myName = "John";

let hero: Hero = Hero {
  name: myName, // ERROR
  hp: 100
};
```

Structures can also have _optional fields_, which have a default value:

```sn
struct [name] {
  ...
  [|val|pln] [field]: [type] = [value];
  ...
};

// e.g.
struct Hero {
  name: string;
  hp: uint = 100;
}

let jack: Hero = Hero {
  name: "Hello"
};

jack.hp += 10; // Works
```

Also, note that models are values, as we will see later.