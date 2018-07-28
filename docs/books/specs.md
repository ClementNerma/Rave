# The Specifications Book

## Foreword

Welcome to the SilverNight's _Specifications Book_. This book aims to provide a detailed view of how the language works, as well as the tools coming with it, and act as a specification document. This document presents many technical aspects and is NOT designed to be a tutorial.

If you are looking for a tutorial or for the detailed functioning of the language, you should read [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) instead.

Also, this book will not introduce the language's toolchain, another book will be published soon about it. It won't talk about the standard library either ; this part is left to the other books.

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

For syntaxes demonstration, the following notations will be used:

* `[x]` indicates a variable value (e.g. a keyword specific to the context) ;
* `[x?]` indicaets an optional variable value

## Values

_Values_ are individual data that can be processed using _expressions_ or _value operators_. Each value has an associated _type_ describing it.

A value can either be a _primitive_ or an _object_.

Primitives are the only type of value that is immutable, meaning their content can never change.

Also, values can be written as _raw values_ (also called _plain values_) or as _unpredictable values_. The first ones are explicit values, meaning they are predictable and won't change whatever happens. The second ones can depend on the program's state. In this chapter, we will only talk about raw values.

### Voids and booleans

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

There is also the `usize` type, which is an unsigned integer with the same number of bytes as the processor the program is running on (32 or 64 bits). It guarantees to be able to handle any memory adress and index.

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
2p;  // usize (Unsigned Pointer)
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

Mutable containers contain an unpredictable value and have a dynamic content, meaning we can perform several assignment separetly on them. They are declared using the `let` keyword:

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

Note that constants are considered as unpredictable.

#### Plain constants

Plain constants are constants with a predictable value, meaning that the value won't change whatever the execution conditions are and what the other contains contain. Otherwise, they work exactly like constants and are declared using the `pln` keyword:

```sn
pln age: uint = 5;
```

Plain constants only accept raw values, and are so considered as containing raw values themselves.

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

### Tuples

Tuples are a special type of value that can contain several mutables at once. Each value in a tuple can have a different type ; it is defined using the following syntax:

```sn
[container]: ( [type1], [type2], ... [typeN] );

// e.g.
let person: (string, uint) = ('Jack', 24);
```

The entities it contains are called its _elements_. They can be retrieved using an _index_, which must be a raw `usize` value:

```sn
[tuple] [ [index] ]

// e.g.
person[0]; // 'Jack'
```

As a tuple's elements are mutables, we can perform an assignment on them:

```sn
person[0] = 'John';

person[0]; // 'John'
```

The tuple's full type can be shortened using a _structure tuple_:

```sn
struct [name] [tuple type];

// e.g.
struct Person (string, uint);

let person: Person = Person { 'Jack', 24 };

person[0]; // 'Jack'
```

Here, the structure's fields are `usize` values instead of standard entity names.

## Expressions

Expressions are a suite of one or more values, each separated by a single _value operator_, which must start and end with a value.

```sn
[value1] [op1] [value2] [op2] ... [valueN]
```

Note that, wherever something asks for a value, it also accepts expressions, as they always produce a value. So, it also accepts an entity, as entities can also be considered as expressions.

When an expression is only made of raw values and operators, it produces a raw values. When there is at least one unpredictable value, it produces an unpredictable value.

They are two types of operators: _value operators_, which produce a value from one or several ones, and _affectation operators_, which work from an entity and a value to change the entity's value.

### Value operators

Value operators are divided into several families ; the first one is the _mathematical operators_ family. They produce a number from two other numbers and use the following syntax: `[num1] [op] [num2]`. Here is the list:

* `+` (add)
* `-` (substract)
* `*` (multiply)
* `/` (divide)
* `%` (modulo)
* `**` (pow)

```sn
// e.g.
6 + 2 // 8
6 - 2 // 6
6 * 2 // 12
6 / 3 // 2
6 % 3 // 0
6 ** 3 // 216
```

Note that the result of these operators has the same type as the left value:

```sn
6us / 2f; // u8 value
```

_Logical operators_ take one or two values to produce a boolean. Their syntax is `[value1] [op] [value2]`. Here is the list:

* `&&` / `and` (and)
* `||` / `or` (or)
* `>` (greater than)
* `<` (less than)
* `>=` (greater than or equal to)
* `<=` (less than or equal to)
* `==` / `is` (equal to)
* `!=` / `isnt` (not equal to)
* `nand` (not and)
* `nor` (not or)
* `xor` (exclusive or)

```sn
pln a: int = 0_b_0011_1100;
pln b: int = 0_b_0000_1101;

a && b; // true
a || b; // true
a > b; // true
a < b; // false
a >= b; // true
a <= b; // false
a == b; // false
a != b; // true
a nand b; // false
a nor b; // true
a xor b; // false
```

There is a last logical operator, which takes only one value:

* `!` / `not` (not) - takes a single value

Its syntax is `! [value]`.

```sn
pln a: int = 0_b_0011_1100;

! a; // false
```

_Bitwise operators_ use the same syntax. Here is the list:

* `&` (bit-by-bit and)
* `|` (bit-by-bit or)
* `^` (bit-by-bit exclusive or)
* `<<` (binary left shift operator)
* `>>` (binary right shift operator)

```sn
pln a: int = 60; // a = 0011 1100
pln b: int = 13; // b = 0000 1101

a & b;  // 0000 1100 : 12
a | b;  // 0011 1101 : 61
a ^ b;  // 0011 0001 : 49
a << 2; // 1111 0000 : 240
a >> 2; // 0000 1111 : 15
~ a;    // 1100 0100 : -60 (for signed integers - two's complement form)
```

There is a last bitwise operator, which takes only one value:

* `~~` (one's complement) - takes a single number

```sn
pln a: int = 60; // a = 0011 1100

~~ a; // 1100 0100 : -60 (for signed integers - two's complement form)
```

There is also an operator working on string, called the _concatenation operator_. Its syntax is the same as the addition operator `+`:

```sn
'Hello' + 'world!'; // 'Hello world!'
```

Another, special operator, is the _strings template operator_. It works only inside multi-line strings and wraps a value: `${[value]}`. The provided value is then returned, as a string:

```sn
val something: string = 'world';

`Hello ${something}!`; // 'Hello world!'
`Hello ${something + '!'}`; // 'Hello world!'
```

Such strings are called _templated strings_.

### Affectation operators

The most known affectation operator is the assignment operator, `=`. It assigns a value to an entity, and its syntax is `[entity] = [value];`.

There are then _shortened mathematic assignment operators_, which are a combination of a mathematical operator with the assignment operator. They use the following syntax: `[entity] [op] [value];`.

```sn
let num: int = 0;

// e.g.
num += 8; // num == 8
num -= 6; // num == 2
num *= 9; // num == 28
num /= 4; // num == 7
num %= 5; // num == 2
num **= 3; // num == 8
```

Finally, there are the incremental operators, which use the following syntax: `[entity] [op];`.

* `variable ++` (post-increment operator, increment `variable` and return its old value)
* `++ variable` (pre-increment operator, increment `variable` and return its new value)
* `variable --` (post-decrement `variable` and return its old value)
* `-- variable` (pre-decrement `variable` and return its old value)

```sn
let num = 0;

val i: int = num ++; // i == '0' ; num == 1
val j: int = ++ num; // j == '2' ; num == 2
val k: int = num --; // k == '2' ; num == 1
val l: int = -- num; // l =='0' ; num == 0
```

### Numbers typecasting

Type numbers are incompatible with them, meaning the following code is not valid:

```sn
let i: int = 2;
let j: u16 = i; // ERROR
```

This is to avoid loss of data during the conversion: an `int` can handle numbers an `u16` cannot, so their would be a loss.

To force the conversion of a number to another type, we use _explicit typecasting_:

```sn
let i: int = 2;
let j: u16 = <int> i;
```

Also, _upcasts_ (converting from a type to another of the same family - signed, unsigned or floating-point - with a larger number of bytes) is performed automatically:

```sn
let i: int = 2;
let j: i64 = i; // Works
```

### Overflow and underflow

When an operation exceeds a number type's maximum bound, it causes an _overflow_ that makes it going back to its minimum bound:

```sn
let i: u8 = 255us;
i += 2;

i; // 1
```

When it exceeds the minimum bound, it causes an _underflow_ that makes it going back to its maximum bound:

```sn
let i: u8 = 0us;
i -= 1;

i; // 255
```

### Type inference

When we make an expression, the builder can determine its type following the operators' typing and the values used by them. This is called type inference and can be used to omit a container's type when it is declared with an initialization value:

```sn
let i = null; // void

val j = true; // bool

let k = 2; // i32
val l = 2s; // i8

pln m = 'Hello'; // string
```

### Inferred Structured Typing

_Inferred Structured Typing_, or _IST_, is a feature that implicitly deduces the model of an object:

```sn
let person = {
  name: 'Jack',
  age: 24
};
```

Here, `person`'s type is a _ghost structure_, an implicit structure that have the following definition:

```sn
struct _Ghost {
  name: string;
  age: int;
}
```

## Syntaxic types

_Syntaxic types_ are types that can be defined with a special, reserved syntax.

### Vectors

A _vector_ is a suite of mutables of the same type. It has a _size_ which defines the number of entities they contain. Its entities are called _elements_.

There are two types of vectors: _arrays_, with a fixed length, and _lists_, with a dynamic one.

Here is how arrays are defined:

```sn
[container]: [type] [ [size] ];

// e.g.
let messages: string[3];
```

If the entity is not initialized, all the entities inside the array take their type's default value, so here `messages` is an array of three empty strings.

#### Arrays

A vector's mutables can be accessed using an _index_, which must be a `usize` value strictly lower than the array's size. It goes like this:

```sn
[container] [ [index] ]

// e.g.
messages[1p] // ''
```

There is a syntax sugar for indexes: we can use a raw `int` value as an index:

```sn
messages[1] // ''
```

As these are mutables, they can also be assigned:

```sn
messages[1] = 'Hello world!';

messages[1]; // 'Hello world'
```

Unlike tuples, the index is not forced to be a raw index:

```sn
let i = 1p;
messages[i]; // 'Hello world'
```

Arrays can be expressed directly as values, using the following syntax:

```sn
[ [value1], [value2], ..., [valueN] ]

// e.g.
[ 2, 5, 8 ] // int[3]
```

Note we can use the universal `[type] [ ]` type to indicate an _unknown-sized array_, which is an array with an unknown size:

```sn
let numbers: int[];

numbers = []; // Works
numbers = [ 2 ]; // Works
numbers = [ 2, 5 ]; // Works
numbers = [ 2, 5, 8 ]; // Works
```

When not initialized, unknown-sized arrays contain an empty array.

Note that, as for all types, arrays support type inference:

```sn
let arr = [ 2u, 3u, 4u ]; // uint[3]
```

Also, note that using a vector's out-of-bound index results in an error:

```sn
let arr = [ 2u, 3u, 4u ];

arr[3]; // ERROR
```

#### Lists

Lists work exactly like arrays, but we can also add and remove mutables from them. Their type is `List<Type>`:

```sn
let numbers: List<int>;
```

This new type syntax is called a _templated type_: the _base type_ is `List`, and it takes a _template type_, which is `int` here.

When not initialized, lists are empty. They can be expressed as values using the same syntax than arrays, but with a sharp symbol (#) after the opening bracket:

```sn
[ # 2, 5, 8 ] // List<int>
```

We can add items to a list by assigning a value to the _unindexed mutable_, which is the syntax has for mutables but without providing an index between the brackets:

```sn
let numbers: List<int>;

numbers[] = 5;

numbers[0] // 5
```

To remove an element, we use the `delete` keyword followed by the entity to remove. The elements after it (if there are) see their index decremented:

```sn
let numbers: List<int> = [ # 2, 5 ];

delete numbers[0];

numbers[0] // 5
```

We can of course use type inference with lists:

```sn
let numbers = [ # 2u, 5u ]; // List<uint>
```

### Dictionaries

A _dictionary_ is a suite of _key_/_value_ pair. The keys share the same type, and the values share another one (which can be, or not, be the same). Its type is `Map<[KeyType], [ValueType]>`:

```sn
let personsAge: Map<string, uint>;
```

By default, a dictionary has no key and no value. As each key is a mutable, we can add some by using the following syntax:

```sn
[dictionary] [ [key] ] = [value];

// e.g.
personsAge['Jack'] = 25;
```

If the key type is `string`, we can use a shorter syntax:

```sn
[dictionary].[key] = [value];

// e.g.
personsAge.Jack = 25;
```

To read it, we use the same syntax without the assignment part:

```sn
personsAge.Jack; // 25
```

In fact, vectors are dictionaries with a key type forced to be a `usize`.

Note that getting an unexisting element will result in an error, as for vectors:

```sn
personsAge.unknown; // ERROR
```

To remove an element, we also use the `delete` keyword like for lists:

```sn
delete personsAge.Jack;
// Or:
delete personsAge['Jack'];
```

And to check if an element is contained in a dictionary, there is the `in` operator which returns a boolean (`true` if the key is found in the dictionary, `false` else):

```sn
[key] in [dictionary];

// e.g.
'inexisting' in personsAge; // false
```

Dictionaries can also be expressed like a structure, but with a sharp symbol (#) following the opening brace:

```sn
let personsAge = {
  #
  Jack: 25
};

'Jack' in personsAge; // true
delete personsAge; // Works
```

## Multi-assignments and slices

### Multi-assignment

The _multi-assignment_ feature allows to perform several assignments at once. Considering the following object:

```sn
val hero = {
  name: 'John',
  age: 20,
  warrior: true
};
```

We can store its properties in three constants, `name`, `age` and `warrior`, in a single instruction:

```sn
val { name, age, warrior } = hero;

age; // 20
```

This also works with dictionaries:

```sn
val ages = { # jack: 24, john: 32 };

val { jack, john } = ages;
```

Note that retrieving an unexisting property from the dictionary will result in an error:

```sn
val ages = { # jack: 24 };

val { jack, john } = ages; // ERROR ('john' not found)
```

This also works with arrays:

```sn
val arr = [ 2, 5, 8, 9 ];

val [ n1, n2, n3, n4 ] = list;

n2; // 5
```

And with tuples:

```sn
val numbers = (2, 5, 8, 9);

val (n1, n2, n3, n4) = list;

n3; // 8
```

Note that performing a multiple assignment with a vector or a tuple that doesn't have the exact same size will result in an error:

```sn
val arr = [ 2 ];
val [ n1, n2 ] = arr; // ERROR (too short vector)

val arr = [ 2, 5, 8 ],
val [ n1, n2] = arr; // ERROR (too long vector)
```

### Fields auto-filling

Fields can be _auto-filled_, meaning we can implicitly deduce their value, using the following syntax:

```sn
let name = 'Jack';
val age = 24;
pln warrior = true;

val hero = { name, age, warrior };

hero.name; // 'Jack'
```

### Slices

A _left slice_ allow to assign part of a vector's elements, from the left:

```sn
val [ ...first, n4 ] = arr;

// Equivalent to:
val first = [ arr[0], arr[1], arr[2] ];
val n4 = arr[3];
```

Here, `first` is called the slice's _expansion entity_.

We can also perform left slice's opposite, a _right slice_:

```sn
val [ n1, ...last ] = arr;

// Equivalent to:
val n1 = arr[0];
val last = [ arr[1], arr[2], arr[3] ];
```

Or even a _middle slice_:

```sn
val [ n1, ...middle, n4 ] = arr;

// Equivalent to:
val n1 = arr[0];
val middle = [ arr[1], arr[2] ];
val n4 = arr[3];
```

It's also possible to perform an _anonymous slice_, which consists in providing no expansion entity:

```sn
val [ ..., last ] = arr;
val [ left, ... ] = arr;
val [ left, ..., right ] = arr;
```

Note that all slices can have an infinite amount of elements between the declaration's brackets but only one expansion entity.

Also, slicing a too short vector will result in an error:

```sn
val arr = [ 2 ];
val [ left, ...middle, right ] = arr; // ERROR (too short vector)
```

## Blocks

Blocks allow to control the program's flow or to perform some specific actions. They use the following syntax:

```sn
[keyword] [head?] {
  [body]
}
```

### Scopes

Instructions are always located in a _scope_.

Anywhere, an opening brace indicates the beginning of a new scope, _child_ of the current one, and a closing brace indicates the end of the last-opened scope. The newly-created scope has for parents the scope it is declared in plus all its parent scope's own parents.

Outside braces, the code is located inside the _main scope_, which is declared implicitly.

A scope can access the entities declared in it as well as in its _parent scopes_, but not them declared in its children scopes, which means the main scope can only access the entities declared in it.

```sn
// e.g.

// <- main scope (scope 0)
let scope0 = true;

{ // <- main scope's child (scope 1)
  let scope1 = true;

  { // <- scope 1's child (scope 2)
    let scope2 = true;

    scope2; // Works
    scope1; // Works
    scope0; // Works
  } // <- end of scope 2

  scope2; // ERROR
  scope1; // Works
  scope0; // Works

} // <- end of scope 1

scope2; // ERROR
scope1; // ERROR
scope0; // Works

// <- end of the main scope
```

### Conditional block

The _conditional block_ uses the `if` and takes as its head a value, called its _condition_. Its body is ran if, and only if, its condition is not a NIL value.

```sn
// e.g.
if 2 == 2 {
  // body will be ran
}

// e.g.
if 2 != 2 {
  // body won't be ran
}
```

The _condition reverser block_ uses the `else` keyword. Its body is ran if the condition of the previous conditional block is a NIL value. It can only be placed after the closing brace of the previous conditional block:

```sn
// e.g.
if 2 != 2 {
  // body won't be ran
} else {
  // body will be run
}
```

The conditional and condition reverser blocks can be mixed together by using the `elsif` keyword, which takes a condition as its head. Its body is ran if the previous conditional block's condition is a NIL value and if its condition is not a NIL value.

As `elsif` being a conditional block itself, it can be followed by a condition reverser block.

```sn
// e.g.
if 2 != 2 {
  // body won't be ran
} elsif 3 != 3 {
  // body won't be ran
} elsif 4 == 4 {
  // body will be ran
} else {
  // body won't be ran
}
```

#### Ternary conditions

A _ternary condition_ is not a block but a shortened syntax of an `if` block followed by an `else` block. It takes a condition, a _success value_ as well as a _fail value_ and uses the following syntax:

```sn
[condition] ? [success value] : [fail value]
```

If its condition is a NIL value, it returns its success value, else its fail value. The two values must be of the same type. A ternary condition is considered itself as an expression.

### Incremental repetition

The _incremental repetition block_ uses the `for` keyword. Its head is made of an _initialization instruction_, followed by a condition, and finally by an _iteration instruction_ which doesn't end by the usual `;` symbol.

This block is also a _loop block_. It creates a _loop_, which consists in repeating the execution of its body from zero to several times. The evaluation of a loop's body is called an _iteration_.

The initialization instruction is ran at the beginning of the loop.

The condition is ran each time the loop's body is ran. If it's a NIL value, the loop is stopped (_breaked_).

The iteration instruction is ran each time the loop's body is going to ran (so after the condition has been evaluated and returned a non-NIL value).

When the iteration instruction has been ran, the loop's body is run. The, we go back to evaluating the condition, and so on until the loop breaks.

```sn
// e.g.
for i = 0; i < 5; i ++ {
  i; // 0, then 1, then 2, then 3, then 4
}
```

#### Specific case for iterators

When the `for` loop is written using the following syntax:

```sn
for [name] = [value]; [condition]; [iteration instruction] {
  [body]
}
```

The `[name]` is called the loop's _iterator_. It is implicitly created as a mutable and is made part of the block's scope:

```sn
// 'i' is implicitly creates as a mutable
//   in the loop's scope
for i = 0; i < 5; i ++ {}

i; // ERROR ('i' is not in this scope)
```

### Breaking and continuing loops

Loops can be manually broke using the `break` keyword as an instruction. When ran, it breaks the loop it's directly located in.

```sn
// e.g.
for i = 0; i < 5; i ++ {
  if i == 2 {
    break ;
  }

  i; // 0, then 1
}
```

The `continue` keyword can also be used as an instruction to ignore all the instructions below it and directly go back to evaluating the loop's condition.

```sn
// e.g.
for i = 0; i < 5; i ++ {
  continue ;

  i; // This instruction is never ran
}
```

### Conditional repetition

The _condition repetition block_ is a loop block that uses the `while` keyword. Its head is a condition, evaluated at the beginning of the loop. If it's a NIL value, the loop is broke ; else the loop's body is ran and we go back to evaluating the condition.

```sn
// e.g.
let i = 0;

while i < 5 {
  i ++; // 0, then 1, then 2, then 3, then 4
}
```

### `while` variant: `until`

The _reversed condition repetition block_ is a loop block that uses the `until` keyword and behaves exactly as a `while` loop, except it breaks if its condition is a NIL value.

```sn
// e.g.
let i = 0;

until i == 5 {
  i ++; // 0, then 1, then 2, then 3, then 4
}
```

### `while` variant: `do...while`

The _end-checked condition repetition block_ is a loop block that uses the following syntax:

```sn
do {
  [body]
} while [condition];
```

Its condition is evaluted at the end of the loop. If it's a NIL value, the loop breaks ; else it goes back to the beginning of the loop.

```sn
// e.g.
let i = 0;

do {
  i ++; // 0, then 1, then 2, then 3, then 4, then 5
} while i < 5;
```

### `while` variant: `loop`

The _infinite repetition block_ is a loop block that uses the `loop` keyword. It does not have any head and runs its body undefinitely - only a `break` instruction can break it.

```sn
// e.g.
loop {
  i ++; // 0, then 1, then 2, then 3

  if i == 3 {
    break ;
  }
}
```

Although it behaves exactly like a `while true { [body] }` loop, it's better to use this one because it allows a better optimization at build time.

### `match` for matches

The _match block_ uses the following syntax:

```sn
match [subject] {
  [value1] -> [instruction1];
  [value2] -> [instruction2];
  ...
  [value3] -> [instruction3];
}
```

It runs the instruction on the right of the value that matches the subject's one. The values must be simple, not expressions.

```sn
// e.g.
match 'Hello' {
  'Hi' -> null;
  'Hello' -> null; // This instruction will be ran
  'Goodbye' -> null;
}
```

It's also possible to specify conditions by wrapping it between parenthesis and writing it instead of a value:

```sn
// e.g.
match 'Hello' {
  (true == true) -> null; // This instruction will be ran
}
```

If several tests match, only the instruction on the first one's right is ran.

The `default` keyword matches if no match has occured in the block yet:

```sn
// e.g.
match 'Hello' {
  'Hi' -> null;
  default -> null; // This instruction will be ran
}
```

### Inline blocks

Blocks can be used in an _inline syntax_. They are placed after an expression to make an instruction, which will be their body. They still keep their head, but they don't have braces anymore, so their syntax become the following:

```sn
[instruction] [keyword] [head?];

// e.g.
let i = 0;

i = i + 1 if i < 5;
i = i + 2 while i < 10;
```

Note that the inline syntax keeps the scope creation blocks perform but it's useful only with the `for` loop which implicitly creates a mutable in its scope.

#### Inline generation

Inline generation is performed by using any loop block inline, if and only if the expression as well as the inline block are wrapped between parenthesis. It initially creates an empty list of the same type than the expression, and add the evaluated expression's result in it at each iteration.

```sn
// e.g.

// Generates a List<int>
let cubes = (i * i * i for i = 0; i < 10; i ++);
```