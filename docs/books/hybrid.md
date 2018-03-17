# The Hybrid Book

## Introduction

Welcome to _"The Hybrid Book"_, a feature-exhaustive tutorial to learn SilverNight. SilverNight is borned from the wish to have a language almost as simple as JavaScript or Python but as powerful, safe and fast as Rust to cover most of developpers' need. It is a statically-typed, functional programming language. Intended for multi-platform development, it comes with great flexibility and a large native library.

**This book is still a draft, some features could be added, changed or removed completely in the final version of the language. Please be careful about this.**

### Why is it an hybrid book?

This book is called "hybrid" because it provides a simple specification for the language but also acts as a tutorial for persons who want to learn it from the beginning to the very end.

### For whom is this book?

This book is for everyone who wants to learn all the features of SilverNight, or simply for developers who are curious to know how this language work.

In order to fully understand this book, you should already know at least one other programming language (the lower level it is, the better), ideally with a good knowledge in Object-Oriented Programming (OOP) because SilverNight always deal with objects.

Please note if you simply want to learn the language, you should read **The SilverNight Book** (not published yet) instead. This hybrid book aims to provide a deep, complex view of the language with all of its detailed concepts.

### Who is this language for?

SilverNight's purpose is to provide a multi-platform compatibility coupled with an expressive syntax. Because of that, this language is not designed for very low-level applications, like drivers or operating systems - though it's still possible to make them, it is not originally intended for. In order to make such low-level programs, you should use other programming languages such as [C++](https://en.wikipedia.org/wiki/C%2B%2B) or [Rust](https://www.rust-lang.org).

### Setting up environment

#### Installation

**As the compiler is not done yet, your programs will not compile and you will not be able to run it. The book is here to details the languages' concept and the way it works. Thanks for your understanding.**

As a pre-requisite you must have [Git](https://git-scm.com/) as well as [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) (or [NPM](https://www.npmjs.com)) installed on your computer.

Open a terminal and run the following commands:

```bash
git clone https://github.com/ClementNerma/SilverNight.git
cd SilverNight/compiler
yarn install-tools # NPM: `npm run install-tools`
```

_NOTE :_ As this program installs the tools on your computer, you may be asked for the **root** password on Linux systems.

To check if all the tools were correctly installed, simply run this command in a terminal:

```bash
snt -v
```

If it shows a version number, then the tools are now available globally!

#### Compiling programs

You can write SilverNight with any text editor - even with the Windows' Notepad! But we advise you to use a code editor, like [Atom](https://atom.io) or [Visual Studio Code](https://code.visualstudio.com), and install the _SilverNight_ extension for them. This will highlight your code following different rules to make it more pleasant to see.

Once you wrote your code, save it in a file with the `.sn` extension. Then, open a terminal and go into the folder in which your file is, and run `snt program.sn` (replace `program.sn` the name of your file) to compile it. This will produce an executable file in the same directory (the name will depend on the platform you are using). You can run this executable directly on any computer that is under the same platform.

#### Commenting your code

SilverNight has several types of comments for different purposes, but the main ones are the single-line and the multiple-line comments. These are passive comments (which means they don't do anything and are perfectly ignored by the compiler).

To write a single-line comment, write `//` just before your comment. Everything written **after** this double slash will be ignored until the end of the line.

For multi-line comments, open the comment with `/*` and close it with `*/`. You can split it across several lines, or put in the middle of a line.

Showcase:

```sn
// This a comment;

println!("Hello"); // This is still one

/* This is a
   multi-line
   comment */

println!(/* Even in the middle of a line */ "Hello");
```

#### Displaying values

You can display values to your terminal (called _output_) by using the `println!` macro (we'll see what is a macro later in this book).

```sn
println!("Hello !");
```

For now, consider you can display any value with it, only special values (like custom classes or conceptual resources) cannot be displayed, but we will see this in details before we encounter this problem.

## Variables and typing

In SilverNight, everything is object. Every single number or string is considered as an object. The thing that describes what an object is is a _type_. What is a type? That's simply a set of methods, properties and other tricks that provides tools to manipulate a resource, like a variable or a constant. You can also see it as a describer that indicates what kind of value a resource can take.

_Tip :_ For those who already programmed in Java, C, C++ or Rust, the concept of type is roughly the same in SilverNight.

There's several way to declare a resource in SilverNight. Let's take a look at variables (mutable resources). We define it with the `let` keyword and give them a _type_ (the class that describes it).

```sn
let hello: string;
```

This will declare a string mutable called "hello". When declared like this, an empty string is put in this (we call it an _instance_ of the "string" class).

To assign a contant, use the `=` operator:

```sn
let hello: string;
hello = "I am a variable!";
```

You can also assign a value in the declaration statement:

```sn
let hello: string = "I am a variable!";
```

This syntax is kind of heavy. Because we don't want to declare a type and an initial value for each variable, we can use a feature called _inferred typing_ which guesses the variable's type thanks to the value you assign to it.

```sn
let hello = "I am a variable!";
```

In the above code, the compiler understands you are trying to assign a string to `hello`, so it guesses its type is `string`.

### Mutability

Some data are not intended to be modified. To store them, we use _constants_, which are declared like variables but with the `val` keyword:

```sn
val constant = "I am a constant!";
```

You can also specify the constant's type, but you will have to give it an initialization value anyway.

```sn
val constant = "I am a constant!"; // Works fine
val constant: string = "I am a constant!"; // Works fine
val constant: string; // ERROR: Initialization value expected
```

Constants cannot have their value changed, so can't use the `=` operator only. See them as read-only resources (though this is not fully true, as we will see later). But you can still use other resources to initialize them:

```sn
// Declare a variable
let str = "I am a string!";

// Declare a constant
val constant = str;

// Assign a new value to the constant
constant = "A new value"; // ERROR: Cannot assign a value to a constant
```

### Plain constants

You can also declare "_plain constants_", which are explicit values that can be used by the compiler to optimize some calls but also to perform additional tests about program's validity. Some functions also require plain constants, as we will see later.

```sn
// Declare a plain constant
pln MY_JOB = "Developer";
```

A convention is to use a capitalized name for plain constants, to make them distinctive from variables. As always, you can declare the value's type, but it's still optional. Note that you cannot assign any content taken from a variable or a standard constant here.

```sn
val MY_JOB = "Developer";
pln MY_REAL_JOB = MY_JOB; // ERROR: Plain value expected
```

You can only assign values from other plain constants:

```sn
pln MY_JOB = "Developer";
pln MY_REAL_JOB = MY_JOB; // Works fine
```

Take the reflex to declare you values using plain (or simple) constant instead of mutables when you won't change their value. This assigns something by error, and helps the compiler finding some errors in your code. Plus, in some languages like JavaScript, it even makes your program a little faster!

### Primitive types

There are two categories of types in SilverNight: _primitives_ and _objects_. The first ones are the `void` value, booleans, numbers and strings. Every other type outside of these is not primitive.

Primitive types can access additional features object types cannot use, such as the optional operator `.=`. It will assign the provided value on its right if and _only if_ the value is NIL (any value between: `void`, `false`, `0`, `""`, `NULL`). This doesn't work with the other types.

## Numbers

### Integers

There is not only one type to represent numbers. The "default" one is **int**, also known as **int32**, a signed 32-bit integer. Basically, it can handle any number between `−2,147,483,648` and `2,147,483,647`.

_Tip:_ The more bits a number uses for its representation, the more memory it takes. If you don't need such a large number, you can use the `int16` number instead (handling from `-32,768` to `32,767`). For very small numbers or when making programs for platforms with a limited amount of memory (like Arduino boards) you can even use the `int8` (`byte`) type (handling from `-128` to `127`).

_Tip:_ All signed type has its unsigned counterpart, which is basically this type prefixed by the `u` symbol. What are unsigned numbers? These are numbers that don't have a positive or negative sign, so they are always positive. For example, `uint32` will handle numbers from `0` to `4,294,967,295` while `uint16` while deal with numbers from `0` to `65,536`.

For very large numbers, you can use the `int64`, `uint64`, `int128` or even `uint128` type (this last one handles from `0` to `~ 3.4 E +38`, so really huge numbers).

_NOTE :_ Here the `E` symbols refers to `10^`: `3.4 E +38` refers to `3.4 x 10^38`.

### Floating-point numbers

SilverNight also supports floating-point numbers. There are two signed types for them, `float`, `double`. Unlike integers, their isn't unsigned floating-point number types.

Their ranges is huge but, where numbers have an exact value, these types have a limited precision:

* `float` handles from `~ 1.2 E -38` to `~ 3.4 E +38` with a 6-decimal precision ;
* `double` handles from `~ 2.3 E -308` to `~ 1.7 E +308` with a 15-decimal precision.

As you can see, the floating-point types can handle huge ranges, but they don't have the same precision. For example, substracting `0.0000003` (7 decimals) to a `floating` will have no effect at all (but it will on `double`, which has a better precision).

_Tip :_ `float` costs 32 bits in memory, while `double` costs 64 bits.

```sn
let num: float = 1;
num = num - 0.0000003; // num is still equal to 1
num = num - 0.000003; // This time, the substracting affected it

let longnum: double = floating; // Works fine
longnum = longnum - 0.0000003; // This time it affects the variable because
                               // `double` type has a better precision
```

### The floating-point problem

A problem that low-level languages (like C or SilverNight) compilers often encounter is how to interpret user's numbers when doing several operations. For example, let's take this code:

```sn
let result = 2 / 3;
```

Why should the compiler understand here? It sees an integer divided by an integer, so the result should be an integer. But any human would understand the result should be here a `float` as the result is around `0.66666...`.

Because of this confusion, the code above will produce `0`. An unexpected number that could result in strange behaviours in your programs. The simpliest and shortest way to indicate you are dealing with a `float` is to do explicit conversion:

```sn
let result = 2.0 / 3.0;
```

Giving a decimal part to a number indicates it's a `float` (or a `double` if it exceeds the range), even if it's `.0`.

### Alternative bases

Because not everyone want to deal with decimal numbers, but also with binary, hexadecimal or even octal, there is a way to represent way simply:

```sn
let dec1 =    92; // Decimal
let dec2 = 0d192; // Decimal

let bin = 0b110; // Binary
let oct = 0o675; // Octal
let hex = 0xFFA; // Hexadecimal
```

Note that all numbers, whatever is the representation you use, are converted to decimals and manipulated by the computer as bits. This is just a way to represent simply numbers in an alternative base.

### Underscore separator

Representing large numbers can quickly become a big deal if you don't have a number separator. Because the comma `,` is reserved to separate arguments and the single quote `'` to delimit strings, we will use the underscore `_` symbol.

```sn
0b10000011;
0b1000_0011; // Strictly equivalent
```

When writing a plain number, all underscores are simply removed from its representation.

### Operators

#### Mathematical operators

_Operators_ are symbols that provides a way to add, substract, multiply or do some operations with one or several numbers. The most common ones are the addition `+`, the substraction `-`, the multiplication `*` and the division `/` operators. Here's how we use it:

```sn
let result = 2 + 5; // Perform an addition
```

If we tell you `2` and `5` are both `int` resources, you can guess the `result` variable will have the same type. Mathematical operators always take two numbers and return a number.

The list of mathematical operators is:

* `+` (add)
* `-` (substract)
* `*` (multiply)
* `/` (divide)
* `%` (modulo)
* `**` (pow)

Showcase:

```sn
8 + 4; // 12
8 - 4; // 4
8 * 4; // 32
8 / 4; // 2
8 % 4; // 2
8 ** 4; // 4096
```

_NOTE :_ As we will see later, mathematical operators can in fact handle any type if some pre-requisites are done. Manipulating numbers is their elementary usage.

#### Incremental operators

There only two incremental operators, they only take a variable (not a constant or a plain value) and change its value depending on the operator. You can write the operator before or after the variable's name but be aware, this will change the operator's effect.

* `variable ++` (post-increment operator, increment `variable` and return its old value)
* `++ variable` (pre-increment operator, increment `variable` and return its new value)
* `variable --` (post-decrement `variable` and return its old value)
* `-- variable` (pre-decrement `variable` and return its old value)

Showcase:

```sn
let variable = 0;

println!(variable ++); // Prints: "0" ; variable = 1
println!(++ variable); // Prints: "2" ; variable = 2
println!(variable --); // Prints: "2" ; variable = 1
println!(-- variable); // Prints: "0" ; variable = 0
```

#### Bitwise operators

These are bit-by-bit operators - operators that work on each single bit of numbers. They take two number and return a number.

They are:

* `&` (bit-by-bit and)
* `|` (bit-by-bit or)
* `^` (bit-by-bit exclusive or)
* `<<` (binary left shift operator)
* `>>` (binary right shift operator)

The last bitwise operator takes a single number and return a number: that's the one's complement `~` operator.

Showcase:

```sn
pln A = 60; // A = 0011 1100
pln B = 13; // B = 0000 1101

A & B;  // 0000 1100 : 12
A | B;  // 0011 1101 : 61
A ^ B;  // 0011 0001 : 49
~ A;    // 1100 0100 : -60 (for signed integers - two's complement form)
A << 2; // 1111 0000 : 240
A >> 2; // 0000 1111 : 15
```

#### Logical operators

These are operators that take one or two entities they convert to booleans (`false` if it's a NIL value, `true` else) and return a boolean.

The logical operators are:

* `&&` (and, alias: `and`)
* `||` (or, alias: `or`)
* `>` (greater than)
* `<` (less than)
* `>=` (greater than or equal to)
* `<=` (less than or equal to)
* `==` (equal to)
* `!=` (not equal of)
* `nand` (not and)
* `nor` (not or)
* `xor` (exclusive or)
* `!` (not) - which takes only one value (alias: `not`)

Showcase:

```sn
pln A = 0_b_0011_1100;
pln B = 0_b_0000_1101;

A && B; // true
A || B; // true
A > B; // true
A < B; // false
A >= B; // true
A <= B; // false
A == B; // false
A != B; // true
A nand B; // false
A nor B; // true
A xor B; // false
! A; // false
```

#### Assignment operators

Unlike operators above that create a value from two other ones, assignment operators directly affect the variable it operates on.

The list is: `+=` (add), `-=` (substract), `*=` (multiply), `/=` (divide), `%` (modulate), `**=` (pow).

For example, doing `var += 5` is exactly like `var = var + 5`. The same thing applies for all assignment operators.

Showcase:

```sn
let value: int = 0;

value += 8; // value == 8
value -= 6; // value == 2
value *= 9; // value == 28
value /= 4; // value == 7
value %= 5; // value == 2
value **= 3; // value == 8
```

#### Concatenation

In SilverNight, the `+` (add) operator also acts as the _concatenation operator_. It provides a way to _concatenate_ two stringifyable entities, like a `string` and an `int`. For example, if you have a variable called `area` and you want to display its value with a message, you can do:

```sn
println!("The area is: " + area);
```

Here, the compiler will understand you want to do a concatenation because the first entity is a string, and the second one a number. So it will perform the concatenation.

#### Bonus: String expressions

Here is a useful trick when using strings: you can _evaluate an expression_ from the inside of a string and get its result directly. Let's try it:

```sn
val area = 8.5;
println!("The area is: " + area); // "The area is: 8.5"
println!(`The area is: ${area}`); // "The area is: 8.5"
```

As you can see, here we use backquotes to delimit the string. In the last `println!` statement, `${...}` indicates an expression that must be evaluated and returned in the string. Here, `area` is evaluated as `8.5`, converted to a string, then returned.

The code above would also work fine:

```sn
println!(`This is ${'go' + 'od'}`); // "This is 'good'"
```

Because the `'go' + 'od'` expression is evaluated and its result (`good`) returned in the string.

Think about this feature when using strings with dynamic values!

## Understanding types

### Vectors

When we want to represent a list of data in SilverNight, we use _vectors_. First, they are **lists**, which have a fixed length, and **arrays**, which are extensible.

Let's declare a list of 3 names:

```sn
let names: string[3];
```

Here, `names` is a list with 3 values, not extensible. We can access its elements by doing:

```sn
println!(names[0]); // First element
println!(names[1]); // Second element
println!(names[2]); // Third element
```

As you can see, indexes start at `0`. That's a standard implementation of vectors in almost any programming language. If you run the code above, it will display three empty strings, because we haven't initialized our list yet. We know have several choices:

* Assigning values at declaration ;
* Assigning them _after_ declaration ;
* Assigning them one by one

Here is how to implement all of them:

```sn
// Assigning values at declaration
let list: string[3] = [ "Jack", "Lucy", "Thomas" ];

// Assigning values after declaration
let list: string[3];
list = [ "Jack", "Lucy", "Thomas" ];

// Assigning values one by one
let list: string[3];
list[0] = "Jack";
list[1] = "Luy";
list[2] = "Thomas";
```

We can even declare the list without its type:

```sn
let list = [ "Jack", "Lucy", "Thomas" ];
```

To define an array, we do like this:

```sn
let list: string[];
```

We don't even have to declare a length because it is not fixed, so we can add and remove elements whenever we want. Let's rewrite the three assignment methods, for arrays:

```sn
// Assigning values at declaration
let list: string[] = [ "Jack", "Lucy", "Thomas" ];

// Assigning values after declaration
let list: string[];
list = [ "Jack", "Lucy", "Thomas" ];

// Assigning values one by one
let list: string[];
list.push("Jack");
list.push("Lucy");
list.push("Thomas");
list[2] = "Thomas";
```

As you can see, if we except the length value, only the third way changed. We know _push_ new elements, instead of assigning them. We can also remove the last pushed element by doing `list.pop();` which also returns this element (so we can do `let last = list.pop();`).

We can also access indexes with variables:

```sn
let value: int = 1;
println!(list[value]); // Prints: "Lucy"
```

### Templated types

When we saw vectors, we didn't talked about what they _really_ are. They are in fact represented by two classes, `List` and `Array`. There are different on some little points:

* `List` is a fixed-length list. We cannot extend it or remove some elements, we can just do some operations on the elements it contains ;
* `Array` is an extensible list.

We will be able to access exactly the same functions for both the `List` and the `Array` type, excepted there are some additional ones for `Array` (like extension or elements removing).

There is a specificity about these types, though. If you simply try to create variables with them, like for a list of names:

```sn
let names: List; // ERROR
```

Your program won't work. Why? Because these types are called _templated_ types. This mean they need _another type_ to work correctly. In fact, vectors need to know what _type_ the values will take. In our case, we want to store a list of names, which are strings, so let's declare it:

```sn
let names: List<string>;
```

Here, `List` is called a _templated type_ and `string` is called its _template_. There's still a problem though: while arrays have a flexible length, lists have a fixed one. So we know have an empty `names` list we cannot anything with. Let's say we have 3 names:

```sn
let names: List<string> = new List<string>(3);
```

Here's a keyword we don't know: `new`. It simply creates an _instance_ of a type, an object. This won't work on primitive types like `string`.

We give one argument to `List` here: `3` is the length of the list. But this syntax is still heavy, so let's shorten this declaration:

```sn
// Inferred type allows us to omit the type
let names = new List<string>(3);
// There is also a syntax sugar for lists:
let names: string[3];
```

The second line above works exactly like the first one: they both declare a new list with 3 values.

Let's know see how we declare an array:

```sn
// The fully explicit version
let names: Array<string> = new Array<string>;
// Inferred type version
let names = new Array<string>;
// Syntax sugar version
let names: string[];
```

We can now use them as we saw previously.

### Structures

We now want to represent a video game hero. It has a name, Health Points (HP), Magic Points (MP), attack and defense points. How could we describe this? A first idea would be to make a list of five elements, the first element referring to the name, the second one to the HP, the third one to the MP, and so on. But this is not very readable and hard to maintain.

A great tool to make custom objects is the _structure_. It acts like a class, but we define its properties and methods. It is not exactly a class, but we'll do as if it was one - for now, at least. Here's how it works:

```sn
struct Hero {
  name: string;
  hp: int;
  mp: int;
  atk: int;
  def: int;
}
```

Now, we can instanciate it like we would do with any other type:

```sn
let jack: Hero;
```

All the structure's properties have been initialized to their NIL value: the name is an empty string, the hp, mp, attack and defense are equal to 0.

Let's remediate to that by giving values at declaration time!

```sn
let jack: Hero = {
  name: "Jack",
  hp: 80,
  mp: 10,
  atk: 20,
  def: 5
};
```

All properties can be assigned anytime. We could do `jack.hp += 5;` whenever we want. But we want to name to be constant. So, in the structure, we change:

```sn
  // ...
  name: string,
  // ...
```

To:

```sn
  // ...
  val name: string,
  // ...
```

And the property will be constant! Be aware though, we absolutely need to initialize `jack`'s declaration. Else, an error will be thrown by the compiler, saying the object was not initialized.

But we can still make some properties optionals, so we won't have to specify them when initializing the structure:

```sn
struct Identity {
  val name: string;
  adult: bool = false;
}

val jack: Identity = {
  name: "Jack"
};

println!(jack.adult); // Prints: "false"
```

### Dictionaries

Last but not least, let's imagine we want to associate the name of a person with its age. We want to be able to add or remove persons at anytime. A structure will of course not be adapted for this purpose. But there is a tool for this type of situations: the dictionaries. These act like lists or arrays, but this time indexes are not forced to be integers but any resource, even boolean or other dictionaries! They are of course extensible.

```sn
let ages: Dictionary<string, int>;
```

We can know add any property by doing `ages.Jack = 28;` or so on. To remove a property, we simply do `ages.unset();`. Here's a trap of dictionaries: all properties will return - if they exist - an instance of the second template (`int` here) but a few ones, like `unset` or `has`, will be functions. In order to avoid this problem with variables, writing `ages[anyIndexHere]` will return an `int`, whatever `anyIndexHere` is. We can even write `ages["unset"]` which does the same thing.

Also, there is a shortcut for dictionaries with `string` keys: the `Collection` type. Here is how it goes:

```sn
let ages: Collection<int>;
```

Now `ages` map a `string` (key) to an `int` (value). Writing `Collection<T>` is exactly like writing `Dictionary<string, T>` - it's just a shortcut.

Showcase:

```sn
// Declaring the dictionary
let ages: Collection<int>;

// Making associations
ages.Jack = 28;
ages.Lucy = 21;
ages.Thomas = 32;
```

We can also initialize the dictionary with values:

```sn
let ages: Dictionary<string, int> = {
  Jack: 20,
  Lucy: 21,
  Thomas: 32
};
```

Unlike structures, you can here use a variable for the index, so the following code will work as expected:

```sn
let index = "Lucy";
let ages: Dictionary<string, int> = {
  Jack: 20,
  Lucy: 21,
  Thomas: 32
};

println!(ages[index]); // Prints: "21"
```

But a new trap comes here. If you try to omit the type in the declaration above, you will have some surprise at compilation time because `ages` would now be a structure with three properties, `Jack` `Lucy` and `Thomas`! Why does this happen? Because Inferred Structured Typing (IST) we will see now.

### Inferred Structured Typing

IST is a feature of the SilverNight language that aims to simplify data typing.

Let's say we have to handle an object that is a list of books. This would be an array of objects, each with the name of a book and a "details" object that would contain the author's name, the release year as well as the country it was initially released. We want to have two books inside it initially. Because we have an array, containing a specific object, we would write the following code:

```sn
struct Book {
  name: string;
  details: {
    author: string;
    year: string;
    country: string;
  }
}

// Make a list of books
let books: Book[];

// Add a first book
books.push({
  name: "Harry Potter",
  details: {
      author: "J.K. Rowling",
      year: "1997",
      country: "United Kingdom"
  }
});

// Add a second one
books.push({
  name: "Eragon",
  details: {
    author: "Cristopher Paolini",
    year: "2003",
    country: "USA"
  }
});
```

That's pretty heavy, right? That's why SilverNight supports IST. Here's how the compiler implements it: when you specify the type of a resource, the compiler attemps to see exactly the same structure in the initialization part (if there is one). That's why you can do the same assignment for a `List` and an `Array` variable, even though there don't have the same type. The compiler understands you are trying to assign a list of data and do the required stuff in the background.

IST takes sense when you have more complex structures like this and don't want to define a whole structure. It analyses your object and guesses its type to make what it calls an _on-the-fly_ structure, a structure that wasn't defined explicitly. Here's an example for our problem:

```sn
let books = [
  {
    name: "Harry Potter",
    details: {
      author: "J.K. Rowling",
      year: "1997",
      country: "United Kingdom"
    }
  },

  {
    name: "Eragon",
    details: {
      author: "Cristopher Paolini",
      year: "2003",
      country: "U.S.A."
    }
  }
];
```

We didn't defined any structure, and yet the compiler guesses the type of the `books` variable. There's only one problem here: the compiler will understand you are making a _structure_, so nothing is extensible here. You can still change a book's name, the country it was originally published in, but not add new books.

To solve this problem, we write `#Dynamic` (names beginning by a `#` symbol are called _directives_) at the beginning of the object we want to make extensible.

```sn
let books = [
  #Dynamic

  {
    name: "Harry Potter",
    details: {
      author: "J.K. Rowling",
      year: "1997",
      country: "United Kingdom"
    }
  },

  {
    name: "Eragon",
    details: {
      author: "Cristopher Paolini",
      year: "2003",
      country: "U.S.A."
    }
  }
];
```

Now all works fine!

To fully understand the powerfulness of IST, let's think we want to make the `details` object extensible, to add _optional_ new informations about the book. We would have to add `#Dynamic` at the beginning of each `details` object, but that would be too heavy. So we simply have to write it at the beginning of the very first `details` object and it will affect all the other ones. It's as simple as that.

_NOTE :_ We say that IST produces **on-the-fly structures**, which means it produces structures that were not declared before being used.

`#Dynamic` will turn `List` objects into `Array` ones and `struct` into `Dictionary<string, int>` here. Of course, this last step requires all the properties into `details` have the same type, else it wouldn't work.

Note that it works with defined object too:

```sn
val harryPotter = {
  name: "Harry Potter",
  details: {
      #Dynamic
      author: "J.K. Rowling",
      year: 1997,
      country: "United Kingdom"
  }
};

val eragon = {
  name: "Eragon",
  details: {
      #Dynamic
      author: "Cristopher Paolini",
      year: 2003,
      country: "U.S.A."
  }
};

let books = [
  #Dynamic
  harryPotter, eragon
];
```

Here, because we create a list from two distinct objects, they must have the `#Dynamic` directive on their `details` field.

### Frozens

Along with variables and constants, there is a third type of resource which is the _frozen_. Let's imagine we have a `Person` structure with a `name: string` and an `adress: string` field. Now we want to represent a person but we also want to make it immutable, e.g. its properties must not be editable after its declaration.

Intuitively, we would write the following code:

```sn
struct Person {
  name: string;
  adress: string;
}

val paul = new Person({ name: "Paul", adress: "Somewhere" });
```

That code compiles perfectly well, but if you try to write the following code after:

```sn
println!(paul.name); // Prints: "Paul"
paul.name = "John"; // Works
println!(paul.name); // Prints: "John"
```

This happens because the `val` keyword only affects the _resource_ itself, not its _content_. So, even though we're not be able to assign any new content to `paul` (doing `paul = new Person({ ... });` will throw an error), its content is still modifiable.

To prevent this behaviour, there's a third keyword that can describe our `paul` constant: the `frozen` keyword.

```sn
struct Person {
  name: string;
  adress: string;
}

frozen paul = new Person({ name: "Paul", adress: "Somewhere" });

println!(paul.name); // Prints: "Paul"
paul.name = "John"; // ERROR
```

Here, we told to the compiler to completely freeze `paul`. This way, its properties cannot be modified anymore.

_Tip :_ The `frozen` keyword works on almost any type, including `Dictionary`.

## The blocks

### Conditional blocks

There are several types of _blocks_ in SilverNight. One of them are the conditional blocks, they provide a way to run a set of instructions only if a condition is met.

The first one is the `if` block. It runs a provided code if the expression between parenthesis is anything different from the primitives' type `NIL` value. Its syntax is:

```sn
if (2 + 2 == 4) {
  println!("Good.");
}
```

Let's look at what happens here. First, the `2 + 2 == 4` expression is evaluated. As it's using the `==` logical operator, the result is `true`. Because it's a value different from the four NIL value we saw above, the instructions set is ran.

If you want to do something if the expression _is_ a NIL value, you can use the `else` block to revert the condition:

```sn
if (2 + 2 == 5) {
  println!("What?");
} else {
  println!("Good.");
}
```

Here, the `2 + 2 == 5` returns `false`, which is a NIL value, so the instructions set is not ran. But the `else` block reverts the condition and, because it was `false` before, it becomes `true`, so its own instructions set is ran. You will see a `Good.` message in your console if you run it.

You can also have multiple conditions by combining `else` and `if`:

```sn
let name = "John";

if (name == "Marco") {
  println!("Your name is Marco!");
} else if (name == "Paul") {
  println!("You are Paul.");
} else if (name == "John") {
  println!("Welcome, John!");
} else {
  println!("I can't remember you...");
}
```

_Tip :_ When the instructions set of a block is made of a single instruction, you can remove the `{` and `}` symbols, like this:

```sn
let name = "John";

if (name == "Marco")
  println!("Your name is Marco!");
else if (name == "Paul")
  println!("You are Paul.");
else if (name == "John")
  println!("Welcome, John!");
else
  println!("I can't remember you...");
```

_Tip :_ Unlike some other languages, the compiler doesn't care about the indentation. So, can you also write:

```sn
let name = "John";

if (name == "Marco") println!("Your name is Marco!");
else if (name == "Paul") println!("You are Paul.");
else if (name == "John") println!("Welcome, John!");
else println!("I can't remember you...");
```

This will work fine.

### `for` for incremental repeat

A general concept you will find in almost every language is the concept of _loops_. A loop is a block that repeats a set of instructions under certain conditions. Let's see how they work.

The `for` block repeats the instructions a given amount of times. It needs an _iterator_ (which is a variable with any `Number` type - integer or not), an optional start value, a condition and an incremental expression. Here is how we write it:

```sn
let i: int;

for (i = 0; i < 5; i ++) {
  println!(i);
}
```

What does this code do? First, we declare a variable called `i` (the `int` type here is optionnal ; it is written to be more clear). The loop starts by giving it a first value (the _start value_) to 0. The loop indicates it will run **until** its condition is true (`i < 5`). Then, it specifies its _incremental expression_, an expression which is evaluated each time the loop is runned (excluding the first time).

So, the loop starts by setting 0 to `i`. The condition is checked, and is evaluated to `true`, so the instructions set will be executed. The program displays `0`. Then, the incremental expression is evaluated so `i` is now equal to `1`. We check again the condition which is still `true`, the expression is ran, the incremental expression is evaluated a second time so `i` is equal to `2`, and so on until, after running the incremental expression, the condition became a NIL value.

The loop above will therefore display `0`, `1`, `2`, `3` and `4`. That's all.

Note that you could also write the variable's declaration directly in the loop's head:

```sn
for (let i: int = 0; i < 5; i ++) {
  println!(i);
}
```

You can write declarations in any block's head, but they will be _scoped_ to this block, which means you can use it only inside the block and that the variable will be deleted outside.

Another thing is about the incremental expression. It can be absolutely any expression, like `i --` to decrement it:

```sn
// This loop does exactly the same thing than the previous one
for (let i = 4; i >= 0; i ++) {
  println!(i);
}
```

Or `i += 5`, or whatever you want. Also, any block made by a single instruction can omit `{` and `}` symbols, so you could write:

```sn
for (let i = 0; i < 5; i ++)
  println!(i);
```

Or even:

```sn
for (let i = 0; i < 5; i ++) println!(i);
```

There is an alternative syntax made to replace the one we saw above. This is called the _range syntax_:

```sn
for (let i of 0 => 5)
  println!(i);

// Equivalent to
for (let i: int = 0; i <= 5; i ++)
  println!(i);
```

Be aware here, the end value is applied to the set of expressions. So, this code will print: `0` `1` `2` `3` `4` `5`.

```sn
for (let i of 5 => 0)
  println!(i);
```

This will result in printing: `5` `4` `3` `2` `1` `0`.

### `while` for conditional repeat

A useful loop every developer has ever used is the `while` block. It repeats a set of instructions _while_ its condition is not a NIL value.

The syntax is:

```sn
let counter = 8;

while (counter > 1) {
  println!(counter);
  counter /= 2;
}
```

This code will print `counter`'s value and then divide it by 2, while it's higher than 1. So it will display: `8` `4` `2`. Then `counter` is equal to 1 so the loop ends.

### `while` variant: `until`

The `until` loop is the exact inverse of `while`: it runs the set of instructions _until_ its condition become anything else than a NIL value.

```sn
let counter = 8;

until (counter <= 1) {
  println!(counter);
  counter /= 2;
}
```

This code will do exactly the same thing than we saw with the `while` block.

### `while` variant: `do`...`while`

A variant of the `while` loop is the `do`...`while` loop. It does exactly the same thing excepted the condition is not evaluated when the loop begins, but when the set of instructions has been run, so you are sure your set will be ran _at least_ one time.

```sn
let counter = 1;

do {
  println!(counter);
} while (counter != 1);
```

This code will display `1` before the loops ends, because the condition is evaluated _after_ the set of instructions.

### `when` for matches

Another useful block is `when`. It returns a result depending on _switchs_ that relies on the value you gave to it.

Let's imagine we have a person and want to run a little set of instructions depending on its name. Assuming we have a `name: string` variable, we could write:

```sn
if (name == "Paul")
  println!("Happy birthday, Paul!");
else if (name == "John")
  println!("How are you, John?");
else if (name == "Marc")
  println!("Hello there Marc!");
else
  println!("I don't know you...");
```

But this is kind of heavy. So we can perform a _match_ instead:

```sn
when (name) {
  "Paul"  => println!("Happy birthday, Paul!");
  "John"  => println!("How are you, John?");
  "Marc"  => println!("Hello there Marc!");
  default => println!("I don't know you...");
}
```

If you want to specify a condition, you can write it between parenthesis. You will have access to the `_` variable which refers to the value given in the block's head.

```sn
let adult: string = when (age) {
  (_ < 20) => "No";
  (_ > 20) => "Yes";
  default  => "Kind of";
}
```

You can also specify a set of expressions for a match, but you will have to return manually the value:

```sn
let adult: string = when (age) {
  (_ < 20) => "No";
  (_ > 20) => "Yes";
  default  => { println!("Default value taken."); return "Kind of"; }
}
```

Note that the `break` instruction does nothing on this block. The `when` block can also be used without assignment:

```sn
when (age) {
  (_ < 20) => adult = "No";
  (_ > 20) => adult = "Yes";
  default  => adult = "Kind of";
}
```

### Ternary conditions

A variant of inline conditions it _ternary conditions_. It returns a value depending on a condition. The syntax is `<condition> ? <value if not NIL> : <value if NIL>`.

Showcase:

```sn
let name = "John";
name = (name == "") ? "John" : "This overwrites the name";
```

### Inline blocks

Sometimes it is useful to write the condition after the instruction. This is why we have the _inline conditions_ syntax that allows it:

```sn
let name: string;

// Set the name only if it is empty
name = "John" if (name == "");
```

You can also use an extended syntax for conditions:

```sn
let name: string;

name = if (! name) "John" else "This overwrites the name";
```

This works with any instruction (exclusing declarations and blocks' head):

```sn
println!("Hello world!") if (world.exists());
println!("Goodbye world!") if (world.willDestroy()) else println!("Good morning world!");
```

You can do this with any condition or loop block:

```sn
println!(i) for (let i = 0; i < 5; i ++);
```

But be aware when dealing with inline loops, this could accidentally result in inline generation and make your program crash, as we will see now.

### Inline generation

Inline generation is a useful feature when coming to generate a list of data. For example, let's say we want to generate a list of the cube of every number between 1 and 10. Intuitively, we could write this:

```sn
let cubes: int[10]; // List<int>

for (let i of 1 => 10)
  cubes.push(i * i * i);
```

But there is another, simplier way to generate this list.

```sn
let cubes: int[10] = (i * i * i) for (let i of 1 => 10);
```

This will do exactly the same thing. Because the compiler has a great support of inferred typing, you can also omit the `cubes`' explicit type:

```sn
let cubes = (i * i * i) for (let i of 1 => 10);
```

This is also why we told you should be careful when using inline loops. All inline loops generate a vector (`List` for explicit `for` loops like ranges or simple incremental / decremental expressions, `Array` for anything else).

Note that inline loops will not perform a generation if a `void` is returned (not any NIL value, only this one). So, if you do:

```sn
println!(i) for (let i of 1 => 10)
```

Nothing will be generated. Also, nothing will be generated if you don't give the result to a function or assign it to a variable.

### `break` and `continue` loops

When dealing with a loop, you can want to exit it if a specific even happens. For example, if we have an `hadError` function that returns a boolean to indicate an error happened, we could want to exit the loop.

Let's try it:

```sn
for (let i of 1 => 10) {
  println!(i);

  if (hadError())
    break; // Exit the loop
}
```

This will work as expected: if `hadError` returns `true`, the `break` instruction will be executed and the loop will break.

Another keyword is `continue` that provides a way to ignore all instructions below it but only one time.

```sn
for (let i of 1 => 10) {
  if (hadError())
    continue;

  println!(i);
}
```

This code will check each time if there had an error. If so, it will ignore all instructions above `continue` and iterate the loop a new time. Else, it will run the `println!` macro, just as expected.

### Resoruces are block-scoped

In SilverNight, all resources are _block-scoped_. This means that, when a resource is declared, it exists only _inside_ the block it is declared in. To take an example:

```sn
if (true)
  val message = "Hello world!";

println!(message); // ERROR because `message` does not exist
```

Here, `message` is declared inside an `if` block, so it only exists _inside_ this block. When we go outside of it, the resource does no longer exist. This is done to keep a better clarity about where resources are available. For example, with a loop, you can do:

```sn
for (let i = 0; i < 10; i += 2)
  println!(i);

// Do some stuff here

for (let i = 10; i >= 0; i -= 2)
  println!(i);
```

Without block-scoped declarations, this would not have worked because the declaration of `i` would have been duplicated, so we would have had to be aware to declare `i` at the beginning of the function, to use it later.

## Functions

Another common concept in almost every programming language is the concept of _functions_. A function is a special block that can is not ran by default but that can be called manually. It eventually takes values called _arguments_ and generally return a value called the _return value_.

### Declaration

Let's imagine I want to calculate the area of a triangle depending on its base and its height, then print it and store the result in a constant.

This is very simple and can be achieved very simply, but imagine we have to do this dozens of time. This would be heavy to repeat again and again the same instructions. Each time, we will have to rename the variable. And if we wanted to change anything to the algorithm, we would have to reflect the changes in all our files - which could be very long and introduce new errors.

In order to avoid copy-pasting this block of code again and again, we can use a general programming concept known as _function_.

A function is declared using the `func` keyword. We give it a name, and its arguments between parenthesis, separated by commands. An argument is basically a couple of a name and a type, written as `argname: type` (though we will see later this is not the only syntax for arguments). We then write a double point `:` symbol and the function's return type - the type of the value which is returned by the function.

Let's write the block's head:

```sn
func triangle_area (base: float, height: float) : float {
  // Function's body
}
```

The very first line (without the `{` symbol) is called the function's _prototype_. It declares what the function's name is, what are its arguments, and the type of value it returns. We commonly say that the _prototype_ (the line we saw) _declares_ the function's _signature_ (its name, arguments, their types, and the return type).

We want to first calculate the triangle's area. Let's do this:

```sn
func triangle_area (base: float, height: float) : float {
  val area = 0.5 * base * height;
}
```

Now we want to print it:

```sn
func triangle_area (base: float, height: float) : float {
  val area = 0.5 * base * height;
  println!(`The triangle's area is: ${area}`);
}
```

Now we want to assign it a variable each time we calculate the area. So we will have to declare a variable and make an assignment **outside** of the function. How can we do this?

There's a simple way to achieve this called the _return statement_. It uses the `return` keyword to return a value from the function. This value is an entity can be assigned to a variable or a constant. Let's do it!

```sn
func triangle_area (base: float, height: float) : float {
  val area = 0.5 * base * height;
  println!(`The triangle's area is: ${area}`);
  return area;
}

val first  = triangle_area(2, 8);
val second = triangle_area(3, 7);
val third  = triangle_area(4, 12);
```

You can now use the three constants. Consider the return value of this function acts exactly like a `float`, because _it is_ a `float`.

Here, the return type of the function **must** describe the type of the value it returns. If you try to return an integer, it will throw an error. If you try to return a string, the same thing will happen.

Note that functions have a special type that requires the argument to be a plain value: the `#pln<T>` type. Here is how it goes:

```sn
func i_need_a_plain (integer: #pln<int>) : int {
  return integer * 2;
}

i_need_a_plain (2); // Works fine

val num = 2;
i_need_a_plain(num); // ERROR
```

### Optional arguments

Optional arguments are... optional. Well, that's pretty explicit, at least. When declaring a function's arguments, we list them with their respective types. But, we can also make some of them _omittable_ by giving them a _default value_. Let's try it:

```sn
func sayHello (name: string, justTheName: bool = false) : void {
  if (justTheName)
    println!(name);
  else
    println!(`Hello, ${name}!`);
}

sayHello("John", false); // "Hello, John!"
sayHello("John", true); // "John"

sayHello("John"); // "Hello, John!"
```

This is useful when we don't want to give a default value to arguments. Note that default values can be absolutely anything, even expressions.

### Lambdas and callbacks

We saw that functions can be declared with a name, a list of arguments, a return type and a body. But there are some functions that omit the name, called _lambdas_.

What is their point? The more simple is to take an exemple: let's say we have a list of signed integers, and we want to keep only the positive values called `arr`. The first idea we could have would be to write:

```sn
val posArr: int[];

for (let i = 0; i < arr.size; i ++)
  if (arr[i] >= 0)
    posArr.push(arr[i]);
```

But we have a problem here. We have to define `posArr` as an `Array<int>` while `arr` is a `List<int>`. This could introduce compatibility issues when we'll want to give it to functions that require a list. We can still convert `posArr` to a list by doing `posArr.toList()`, but this would involve to make a whole new list, which takes both memory and time.

That's where lambdas come. There is a function called `filter` we can use on lists, which takes a specific function as an argument. Here is how we use it:

```sn
val posArr = arr.filter(func (value: int, key: int) : bool { return value >= 0; });
```

What happened here? Because it's a little cryptic, we'll re-write the code, with a greater spacing:

```sn
val posArr = arr.filter(
  func (value: int, key: int) : bool {
    return value >= 0;
  }
);
```

Here, we declare a _lambda_ with two arguments `value` and `key` which both are integers, and we say it will return a boolean. Then, we write the function's body, which simply evaluates an expression (returns `true` if `value` is positive, `false` else).

Because this function does not have a name, it's called a lambda: it could not be declared like a standard function which require a name.

Also, why do we need the `key` argument while we don't use it? It's simply because the `filter` function requires it. Let's see the declaration of this function:

```sn
  // ...
  public func filter(callback: func (value: T, key: int) : bool) : self<T>;
  // ...
```

Let's just concentrate on the function's only argument: called `callback`, it is described as a function that takes a `value` and a `key` argument, then returns a boolean. That's why we gave these specific types to our lambda. If we had specificied a `string` for the `key` argument for example, an error would have been throw at compilation.

Note that, while the argument's number, type and the lambda's return type is declared in the function's signature and cannot be changed, you can still change their names to take your own ones. We could have called them `num` and `k` if we wanted to.

There's another way to apply this filter on our list: declaring the function, and then using it as an argument. Because an example will be more clear than a big explanation:

```sn
val myFunc = func (value: int, key: int) : bool {
  return value >= 0;
};

val posArr = arr.filter(myFunc);
```

This will do the same thing than the first version. Here, we declare a `myFunc` variable that works exactly like the lambda we made before, then we use it as an argument for the `.filter` function.

In fact, this constant has an inferred type ; its full declaration would be:

```sn
val myFunc: func (value: int, key: int) : bool = func (value: int, key: int) : bool {
  return value >= 0;
}

val posArr = arr.filter(myFunc);
```

This is where inferred typing is _really_ great!

An interesting point here is that we can _call_ `myFunc` like this:

```sn
println!(myFunc(2)); // Prints: "true"
println!(myFunc(-3)); // Prints: "false"
```

We could also have declared it as a normal function:

```sn
func myFunc(value: int, key: int) : bool {
  return value >= 0;
};

val posArr = arr.filter(myFunc);
```

So, lambdas are great to reduce the size of a program, but it's kind of heavy to use this syntax. This is why we can use the _arrow syntax_:

```sn
val posArr = arr.filter((value: int, key: int) : bool -> value >= 0);
```

We don't have the `func` keyword anymore, but the `->` one appeared. This symbol means that the value on its right is automatically returned by the function. This symbol can in fact even be used with functions, like `function returnTrue() : bool -> true;`. We can also use the `{` and `}` symbols while omitting the `func` keyword to use several instructions, but we'll then have to use manually the `return` keyword.

Showcase:

```sn
// Classic functions
func returnTrue() : bool { return true; }
func returnTrue() : bool -> true;

// Classic lambdas
val returnTrue = func () : bool { return true; }
val returnTrue = func () : bool -> true;

// Arrow syntax
val returnTrue = () : bool { return true; }
val returnTrue = () : bool -> true;
```

But even with the arrow syntax, this is still heavy as we have to write the arguments' type as well as the lambda's return type. So there is a last feature called **ICT** for **I**nferred **C**allback **T**yping we will see now.

### Inferred Callback Typing

ICT works like IST but for functions. Instead of inferring a data's structure, it will infer a function's arugments and return type based on a signature.

This may be appear complex, but let's take a simple example. Remember the `.filter` function we can apply on any `List<T>` value? We gave it a lambda and we had to declare the lambda's arguments' type as well as a return type. But because these types are already specified in the `.filter` function's signature, we know that we'll have _exactly_ the sames types in our lambda's signature.

So there is a way to perform inferred typing on a lambda, for both its arguments' type and its return type. Here is it:

```sn
// Classic lambda
val posArr = arr.filter(func (value: int, key: int) : bool { return value >= 0; });

// Arrow syntax
val posArr = arr.filter((value: int, key: int) : bool -> value >= 0);

// Inferred callback typing
val posArr = arr.filter((value, key) -> value >= 0);
```

This last syntax is clearly lighter as it avoids to declare the types. But be careful though to read carefully the signature of the function you are giving this lambda to ; else you could have some... surprises, at compilation time.

Also, note this will only work with lambdas that are directly given as arguments. These are known as _"flying lambdas"_ in reference to the fact they are declared before being used. That means you can't use ICT if you declare a constant that contains this lambda, and then use this constant as an argument for a function. This is simply because this directive guesses the function's type based on the signature of the function it is gave to, so it wouldn't work with anything that is not a flying lambda.

While we have inferred typing without looking at any signature for data structure, you may be wondering why functions can't have an inferred typing for their arguments and return type too based on their body. For example, if a function only returns booleans, its return type could be inferred.

To answer this question, there is a directive that allows inferred typing for anything, from variables to functions, even to more complex data structures (like interfaces or classes). But like we'll see later, this has some (really) serious downsides and considerably slows down the compilation. Global inferred typing is only useful when some conditions are met, so for now let's put it aside and only consider inferred typing is supported for variables/constants/frozens/plain values, on-the-fly structures and flying lambdas.

### Polymorphism

When declaring a method, we sometimes want to make them callable by several ways. For example, let's say we want to give the coordinates, as a string, of a point. A point is a couple of floating-point numbers, the first one representing X, the second one Y. But, we also want to support the `Point` structure, which has two members `x` and `y`, which the same function name. How could we do that?

The answer to this problem is called _polymorphism_: we declare several functions with the same name, but with different signatures.

Here is how it works:

```sn
// Make the 'Point' structure
struct Point {
  x: float;
  y: float;
}

// Declare the two functions with polymorphism
func pointStr (x: float, y: float) : string -> `(${x}, ${y})`;
func pointStr (pt: Point) -> `(${Point.x}, ${Point.y})`;

// Let's try them!
pointStr(2, 5); // Prints: "(2, 5)"
pointStr({ x: 2, y: 5 }); // Prints: "(2, 5)"
```

They work as expected and print the same result.

## Object-oriented programming

### The concept of class

Here we are. We will now talk about the most important concept in SilverNight, which is also the most complex one: **Object-Oriented Programming**.

Like we saw before, everything in SilverNight is an object. Though primitive types like `string` or `int` are special ones, they follow a strict behavior rules by their _type_.

To introduce the OOP concept, let's see the concept of _class_. Think to classes like advanced structures: they are a set of properties that can be functions. But were classes are brillant is where structures are limited.

### I need a hero!

Let's imagine we want to represent a hero like we saw before.

> We now want to represent a video game hero. It has a name, Health Points (HP), Magic Points (MP), attack and defense points. How could we describe this?

The first option we saw was to make a list, but that was not very convenient (both not readable and poorly maintanable). So we chose to make a structure, and here is the result we obtained:

```sn
struct Hero {
  name: string;
  hp: int;
  mp: int;
  atk: int;
  def: int;
}
```

That was fine. Now let's say we don't want anyone to change the hero's values. The good way to do this is to make constant properties:

```sn
struct Hero {
  val name: string;
  val hp: int;
  val mp: int;
  val atk: int;
  val def: int;
}
```

But now imagine we want to make a function that allows a hero to fight another. This is impossible. Why? Because we can't both make the structure's properties constant **and** change them from inside a function. That's where structures suck.

So, what can we do? Well, we do classes. Here is the syntax:

```sn
class Hero {
  private name: string;
  private hp: int;
  private mp: int;
  private atk: int;
  private def: int;
}
```

First, we _declare_ the class with `class Hero`. This creates a _type_ named `Hero` (that's the first verity about types, every type outside structures is in reality a class). Then, we set up its _members_, an equivalent to structures' properties. But look at the `private` keyword. This indicates that this members are available only from _the inside_ of the class ; that means no one will be able to access these members outside the class. So, how can we do our fight function?

Well, here is how it goes:

```sn
class Hero {
  private name: string;
  private hp: int;
  private mp: int;
  private atk: int;
  private def: int;

  public func @construct(name: string, hp: int, mp: int, atk: int, def: int) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = attack;
    this.def = defense;
  }
}
```

That becomes a little more complicated here. We start by declaring the `@construct` function which is called the _constructor_. This function is called when a resource (variable, constant or frozen) is created with the `Hero` type. Because any return value would be lost from it there is an exception in the language's rules that allow us to not give it a return type (it will implicitly be `void`), without any directive.

The constructor will take as an argument a name, an amount of HP and MP, an attack and a defense. Then, it will assign these given values to its _members_, which are not available from outside the class.

```sn
  // ...
  public func getAttack() : int {
    return this.atk;
  }

  public func beAttacked(ennemy: Hero) : void {
    this.hp -= ennemy.getAttack();
  }
  // ...
```

Here, we define a `getAttack()` and a `beAttacked()` functions publicly, which means everyone can access it, even outside the class. `getAttack()` returns the `attack` member from the current class, while `beAttacked()` runs `getAttack()` from the provided ennemy and decreases its own HP depending on it.

Here is how we instanciate our heroes:

```sn
val jack = new Hero(); // ERROR: Expecting 5 arguments, found 0
val jack = new Hero("Jack", 100, 5, 50, 10); // Let's declare a warrior
```

If we want to consider the defense now:

```sn
  // ...
  public func beAttacked(ennemy: Hero) : void {
    this.hp -= ennemy.getAttack() - this.def;
  }
  // ...
```

Here we consider our defense. But now we have to assure HP loss is not negative. That would be weird to win HP while _being attacked_ by an ennemy.

```sn
  // ...
  public func beAttacked(ennemy: Hero) : void {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
    // Decrease HP
    this.hp -= loss;
  }
  // ...
```

Here we are! Now, let's write a `fight()` function!

```sn
  // ...
  public func beAttacked(ennemy: Hero) : void {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
    // Decrease HP
    this.hp -= loss;
  }

  public func fight(ennemy: Hero) : void {
    // Damage the ennemy
    this.beAttacked(ennemy);
    // Get damages from the ennemy
    ennemy.beAttacked(this);
  }
  // ...
```

We did it! Here is our whole code with the display of names:

```sn
class Hero {
  private name: string;
  private hp: int;
  private mp: int;
  private atk: int;
  private def: int;

  public func @construct(name: string, hp: int, mp: int, atk: int, def: int) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = attack;
    this.def = defense;
  }

  public func getName() : string {
    return this.name;
  }

  public func getAttack() : int {
    return this.atk;
  }

  public func beAttacked(ennemy: Hero) : void {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
    // Tell what happens
    println!(`${this.name} is attacked by ${ennemy.getName()} and loses ${loss} HP!`);
    // Decrease HP
    this.hp -= loss;
  }

  public func fight(ennemy: Hero) : void {
    // Tell what happens
    println!(`${this.name} is going to fight ${ennemy.getName()}!`);
    // Damage the ennemy
    ennemy.beAttacked(this);
    // Get damages from the ennemy
    this.beAttacked(ennemy);
  }
}
```

To test it:

```sn
// Make two warriors
val jack = new Hero("Jack", 100, 5, 50, 10);
val john = new Hero("John", 50, 5, 80, 5);

// Make them fight
jack.fight(john); // Prints: "Jack is going to fight John!"
                  //         "John is attacked by Jack and loses 45 HP!"
                  //         "Jack is attacked by John and loses 70 HP!"
```

### Members accessibility

We just saw two _accessor_ keywords for a class' members: `public` and `private`. Public members are public, so anyone can access them, even from the outside of the class. This mean we can do this:

```sn
class Example {
  public val hello = "Hello!";
}

val instance = new Example();
println!(instance.hello); // Prints: "Hello!"
```

Private members are restricted to the inside of the class, meaning they can be used only by code that is written between the `{` and `}` braces of the class. Here is an example:

```sn
class Example {
  public val hello = "Hello!";
  private val secret = "No one can see me!";

  public func printSecret() -> println!(this.secret);
}

val instance = new Example();
println!(instance.hello); // Prints: "Hello!"
println!(instance.printSecret()); // Prints: "No one can see me!"
println!(instance.secret); // ERROR
```

There is a specificy about private members, though. We can access an instance's private members from the inside of a class even if it's not the current instance.

```sn
class Example {
  public val hello = "Hello!";
  private val secret = "No one can see me!";

  public func printAnotherSecret(other: Example) -> println!(other.secret);
}

val instance = new Example();
val another  = new Example();

println!(instance.printAnotherSecret(other)); // Prints: "No one can see me!"
```

This is due to the fact a class is registered as a _friend_ of itself, but that's a notion we will see later.

### The constructor

Let's see, more in details, how the constructor works.

Declaring a variable with a class as a type is called an _instanciation_. For example, if we do:

```sn
val something = new Superthing();
// OR
val something: Superthing;
// OR
val something: Superthing = new Superthing();
```

We _instanciate_ each time the `Superthing` class, and `something` is called an _instance_ of the class. As we saw, a class is a bunch of _attributes_, which can be public or private (though we'll see more modes later) and _methods_ which are basically functions inside the class. Only the methods can access the private attributes, while the public attributes are available to any piece of code that can access the instance.

Because we want some attributes to be initialized before the developer uses them, we can declare a method that will be ran when the class is instanciated. This is called the _constructor_.

```sn
class Superthing {
  private name: string;

  public func @construct(theThingName: string) {
    this.name = theThingName;
  }
}
```

Here, the arguments took by the constructor are the ones given when instanciating the class. Here:

```sn
val something = new Superthing(/* Arguments for the constructor */);
```

Will fail, because we gave no argument instead of the one the constructor expected. But if we write:

```sn
val something = new Superthing("Gamepad");
```

This will work fine and the constructor will get the `"Gamepad"` value in `theThingName`.

### Methods

Let's now see the _methods_ more in details. This will be pretty simple in fact: methods in classes act like simple lambdas in structures, but they can also access the classes' private attributes and use a few keywords, like `this` which refers to the current class.

Note that all attributes and methods of a class (called its _members_) can be accessed only through the `this` keyword or the instance name. For example:

```sn
class Superthing {
  private name: string;

  public func @construct(theThingName: string) {
    this.name = theThingName;
  }

  public func getName() {
    return this.name;
  }
}
```

Here, the `getName()` function will return the thing's name. To use it, we simply have to do:

```sn
val something = new Superthing("cake");

println!(`The thing's name is ${something.getName()}.`);
  // Prints: "The thing's name is cake."
```

Another trick to use a member from the inside of the class is to use the `@` symbol:

```sn
class Superthing {
  // ...

  public func getName() {
    return @name;
  }
}
```

`@` is a strict equivalent to `this.`, so we can use it to access the members of the current class

We can also use it in the constructor to automatically set some attributes:

```sn
class Superthing {
  private name: string;

  public func @construct(@name: string) {}
}
```

### Readonly attributes

When declaring class' attributes, we sometimes want to make it private because we don't want anyone to change it without control, but we also want a developer to read it. So, this would be a read-only attributes from the class' outside, and a classic attribute from the inside (both readable and writable). Here is how we could implement it:

```sn
class SomeClass {
  private myAttribute: string;

  public func getMyAttribute() : string {
    return @myAttribute;
  }
}
```

This is perfectly valid and works as expected. But doing this can be heavy to write, especially if we have several attributes like this one. So, there is a lighter syntax to achieve this:

```sn
class SomeClass {
  public readonly myAttribute: string;
}
```

This will do the same thing as the previous syntax, excepted we won't access the attribute with `instance.getMyAttribute()` from the outside, but simply with `instance.myAttribute`.

### Static attributes

This is another type of members. Static members are not available from the instances, but only from the class itself. Let's see an example to be more clear:

```sn
class Product {
  private static unique_id = 0;
  public static func increaseCounter() : int -> ++ self::unique_id;
}
```

Here, `increaseCounter()` can only be accessed by using the `::` operator on the class itself, so we would write `CounterClass::increaseCounter()`. This will increase the private static attribute `counter`.

The `self` word refers to the current class, in a static context. This provides a way to access its static attributes. Let's populate the class with attributes for instances:

```sn
class Product {
  // The global counter for unique identnfiers
  private static counter = 0;

  // Increase the global counter
  public static func increaseCounter() : int -> ++ self::counter;

  // The product's unique identifier
  public readonly unique_id: int;
  // The product's name
  public readonly name: string;

  // Initialize the instance
  public func @construct(@name: string) {
    // Generate a unique identifier from the static function
    @unique_id = self::increaseCounter();
  }
}
```

Be aware though, writing `self` is not like writing the class' name (`Product` here). `self` is a reference that can only be used inside of a class, and which provides a way to access its private static members. If we had specified the class' name instead, we wouldn't have been able to access the `counter` attribute.

When static members are private, that means they can only accessed through the `self` keyword, so from the inside of the class only. When they are public, they are available from the outisde of the class thanks to its name, followed by the static operator `::` and the attribute's name.

### Practice: Let's make a map!

Let's now practice with a little exercice. We want to represent a RPG map with a class. Each cell has a number referring to an empty cell (0), a rock (1) or a trap (2). The map is given at its creation, as a double array of integers. The map is a rectangle and has a fixed width and heigh deducted from the double array.

We can move on this map a player, starting from a location given at the map's creation. The player can move up, down, left and right. It can't go on rock cells, and going to a trap will display a message "You've been trapped!" and make the player unable to move.

We have to represent it with a single class, with only private attributes (they can be readable, though). At anytime, we should be able to access to current player's position, to get any cell's value, or to check if the player has been trapped already.

The problem seems to be complex but it is mostly simple to achieve. Read the solution below when you're ready. If you can't solve it, try to read again what we saw before and think about the structure of the class.

Here is the solution:

```sn
class Map {
  // Cell types
  private static readable EMPTY = 0;
  private static readable ROCK  = 1;
  private static readable TRAP  = 2;

  // Private attributes
  public readonly playerX: int;
  public readonly playerY: int;
  public readonly trapped: bool = false;
  public readonly cells: int[][];

  // Create the map
  public func @construct(@cells: int[][], @playerX: int, @playerY: int);

  // Move the hero
  private func move(x: int, y: int) : void {
    // If we fall in a trap before...
    if (@trapped)
      // Move is forbidden
      println("You can't move because you're trapped.");

    // Check if we are outside the map
    else if (x < 0 || x > @cells[0].size - 1 ||
             y < 0 || y > @cells.size - 1)
      println!("Cannot move outside the map.");

    // Check if the cell we are going to is a rock
    else if (@cells[y][x] is self::ROCK)
      println!("There's a rock on your way.");

    // Else, move the player
    else {
      // Save the new player's location
      @playerX = x;
      @playerY = y;

      // If we fell in a trap, game over!
      if (@cells[y][x] is self::TRAP) {
        println!("You've been trapped!");
        @trapped = true;
      }
    }
  }

  // Move up
  public func moveUp() : void -> @move(@playerX, @playerY - 1);
  // Move down
  public func moveDown() : void -> @move(@playerX, @playerY + 1);
  // Move to the left
  public func moveLeft() : void -> @move(@playerX - 1, @playerY);
  // Move to the right
  public func moveRight() : void -> @move(@playerX + 1, @playerY);
}
```

Here it is! This code answers to the problem.

Of course, your solution could be different, as there are many ways to solve it. This anwser is well optimized and relatively short. Try to compare you own solution to this one and see the differences.

A short note about accessibility now: as you can see, `cells` is not cloned when assigned using the constructor. This means that if an pre-defined array is gave to the constructor, changing it from the outside will also affects the class' attribute.
Another point is that `cells` is also readable and not declared as a frozen, so anyone from the outside can access it and change its values.

Here is a corrected version of the class that fixes this mistakes:

```sn
class Map {
  // ...
  public readonly frozen cells: int[][];
  // ...

  // ...
  public func @construct(cells: int[][], @playerX: int, @playerY: int) ->
    // Clone the given cells to avoid them from being frozen
    @cells = clone!(cells);
}
```

Here, if we didn't clone `cells`, the original array would have been frozen too! So that's important to clone it here.

## Classes in depth

Now we've acquired the basis of classes, this part will teach you more complex features of OOP like inheritance, sub-typing or interfaces.

### The destructor

A word about overloads:

We saw before the constructor, a special method called when the instance is created. This method can't be ran the normal way, meaning you can't do `myInstance.construct()` for example. Such a method, and every method we will see beginning by the `@` symbol, are called _overloads_.

By default, when we instanciate a class, nothing is done (excepted creating the object itself). The constructor overwrites this behavior by running its own code.

The destructor is a special function you probably won't use very often, but it is still useful in some cases. Like the constructor, it's an overload, and is written `@destruct`. It takes no argument and must be `void`-typed, so its return type can also be omitted.

Now, a word about freeing:

When dealing with heavy objects, or simply when using a low-level languages, developers often _free_ their variables themselves. Freeing a variable means its value is definitely removed, so it doesn't take memory anymore. Of course, after a resource is freed, using it will result in an error.

A resource can be freed several ways. The first one is with the _garbage collector_, a little tool that detects what resource isn't used anymore and free it because it knows it won't be used anymore. This is done automatically in JavaScript or Python for example, two interpreted high-level languages. Languages such as Rust have other tools instead that does the same thing, but that insert a piece of code to free the resource when compiling the source code. Some other languages, finally, like C or C++, doesn't have this feature and resources must be freed manually.

In our case, the destructor is called when the instance is manually freed, using the `free!` macro. Here is how it looks like:

```sn
class IntArray {
  private data: int[];

  public func @destruct() {
    println!("I will be freed.");
  }

  public func add(value: int) : void -> @data.push(value);
  public func pop() : bool -> @data.pop();
}

let arr = new IntArray();
arr.push(2);
arr.push(4);
arr.push(3);
free!(arr); // Prints: "I will be freed."
```

This overloads aims to provide a way to run a specific code when the developer explicitly says it doesn't need the instance anymore. After the destructor is ran, the instance is freed and any usage of it will result in an error.

### Freezing

Remember the frozens? We saw they were deep constants where even attributes, sub-structures etc. were completly frozen.

Frozens have a second use, though. Their real aim is not to deeply freeze an object's values, but to freeze it in its behavior. This is not really clear, so let's see how it goes.

Let's imagine we have a class representing a list of integers. We have a method, `add`, to add a number to a private list and `pop` to get the last value from it, plus a `sum` function to calculate its sum.

If we simply declared an instance of this class as a frozen, it will freeze its public attributes. But this won't prevent from adding numbers to the private list thanks to the `add` function, for example.

That's why an overload exists to implement the 'frozen' state in a class, called `@freeze`. It takes no argument and is `void`-typed, so its return type can be omitted. It this method is implemented, the instance is considered as being able to be frozen.

```sn
class IntArray {
  public readonly data: int[];

  public func @freeze() {}

  public func add(value: int) : void {
    // Check if the instance is frozen
    if (is_frozen!())
      println!("The class is frozen, can't append anything.");
    else
      @data.push(value);
  }

  public func pop() : bool {
    // Check if the instance is frozen
    if (is_frozen!())
      println!("The class is frozen, can't pop the top value.");
    else
      @data.pop();
  }

  public func sum() : int -> @data.reduce((acc, value) -> acc + value);
}
```

As you can see, the overload's body is empty. It's simply because when declaring this overload, we explicitly tell that our class can be frozen, so it will freeze every single attributes, even the private ones. It will also turn a hidden boolean, the _frozen flag_ to `true`, meaning the instance has been frozen. Then, the `is_frozen!` macro returns it. We could also have put a `println!("I'm now frozen");` code in the overload, but that's totally optional, and most of the time this overload will be empty. Now we know what is does, let's see the process more in details:

When freezing the class, we aim to make the instance and its data immutable. But there is a problem here. In fact, even if `data` can't be written from the outside, its sub-values can. For example, doing `arr.data = [1, 2]` won't work, but `arr.data[1] = 5` will. This is due to the fact `arr.data[1]` is independent of `arr.data` because it's its own single value, while `arr.data` is a list of values, not the values themselves.

Because of this behaviour, our instance is not _fully_ frozen. That's why implementing the `@freeze` overload will automatically freeze all attributes, even private ones, and their own attributes if they are objects are instances of classes, and so on. Even though freezing all of this could take a bit of time, it's done because declaring is frozen is always done intentionnally. If we simply wanted to make `add` and `pop` unable to act, we would have implemented a `makeImmutable` method or something.

Thanks to this behaviour, we don't take the risk to forget freezing an attribute, a problem that can occur especially when adding new attributes to a class and forgetting to freeze them. Hopefully, we don't have to think about that.

Note that any instance of the `IntArray` can still be frozen after being declared, using the `freeze!` macro, which permits to freeze the data after manipulating its data.

Also, conventionnally, freezing cannot be undone, so we don't have to implement an `unfreeze` method or anything.

A last advice about freezing is that **all** native types support freezing, so you don't have to worry when dealing with them, from `int` to `Dictionary<string, List<string>>`.

The notion of freezing is complex, so don't hesitate to read it again, until you understand. That's an important feature because declaring an instance as frozen or freezing it manually will throw an error if the overload is not implemented in the class.

### Cloning

Let's imagine we have a list of integers. We make a function that calculate, for each number, its square, and return a final list with these numbers. Here is how we would implement it:

```sn
func squareList (list: List<int>) : List<int> {
  for (let i = 0; i < list.size; i ++)
    list[i] *= list[i];

  return list;
}
```

This works fine, but let's now try the following code:

```sn
val list = [ 2, 7, 8 ];
val squares = squareList(list);

println!(squares[1]); // Prints: "49"
println!(list[1]); // Prints: "49"
```

Did you understand what just happened? When we modified the values of the list in our `squareList` function, this also affected the original list. So the original and the result are exactly the same ones.

This behaviour is due to the fact SilverNight doesn't clone objects each time, because it would be way too long. We can also observe the problem on objects:

```sn
// Define a first hero
val jack = {
  hp: 100,
  atk: 20,
  name: "Jack"
};

// John is a hero, just like Jack is
val john = jack;

// Set John's name
john.name = "John";

// Surprise!
println!(john.name); // Prints: "John"
println!(jack.name); // Prints: "John"
```

The same thing applies for any object, so for any non-primitive values (anything that is not a `void`, a boolean, a number or a string). This is a big problem, but which has a very simple answer: cloning.

To solve our first problem, we simply have to do this:

```sn
val list = [ 2, 7, 8 ];
val squares = squareList(clone!(list));

println!(squares[1]); // Prints: "49"
println!(list[1]); // Prints: "7"
```

This works perfectly fine. We simply added a `clone!` instruction, and our problem is solved because we explicitly tell we want to make a brand _new_ list with the same values than the first one.

But cloning is not magic. We can't simply clone data like this. Imagine a class contains an `unique_id` attribute that aims to be a unique number. Cloning it like that would throw this rule away. This is why, by default, instances can't be cloned until they implement the `@clone` overload. Let's consider this class:

```sn
class Product {
  public readonly unique_id: int;
  public readonly name: string;
  public readonly price: int;
  private static counter: int = 0;

  public @construct(@name: string, @price: int) {
    @unique_id = self::counter ++;
  }
}
```

It can't be cloned because the cloning overload is not present in the class.

For this one we can choose between two signatures: a function which takes ones argument (let's call it `target`), and must return an instance of the current class (return type is omittable). In this case, the program will automatically clone the instance by creating a new object with the same methods and attributes, and assign the values to the new instance's attributes (even private ones) by cloning the original's ones. Note that the constructor is not called when the instance is automatically cloned.

The overload will then be able to manipulate the target before returning it, in order for example to change unique identifiers or other things. Here is how it could look like:

```sn
  // ...
  public func @clone(target: self) : self {
    // Print a simple message
    println!(`Cloning a ${target.name}`);

    // Set a new unique identifier
    target.uid = self::counter ++;

    // Return the target
    return target;
  }
  // ...
```

The second signature takes no argument, and must manually return an instance of the current class (return type is omittable). That's especially useful when two objects with the same attributes can't exist both at the same time, for example. That's more specific but will be needed in some cases.

```sn
  // ...
  public func @clone() -> new Product(@name, @price);
  // ...
```

Be aware, in the case you manually create an instance, don't forget to clone arrays if you give some to the new instance from the current one (same with objects and instances from other classes) - else you could encounter some unexpected behaviour like modifying an instance changes an other too. Conceptually, the goal of a clone is to have the same behaviour than the original (same values...) but to be independant from it.

#### The lazy way

There is a third and last way to grant cloning support to your class. It's called a _lazy_ overload and works, instead of a function, with a single attribute. Here is how it goes:

```sn
  // ...
  public pln @lazy_clone = true;
  // ...
```

If we write that, instances of the class will support cloning but we won't be able to do anything when this happen, or even be notified of that. All the attributes of the original instance will automatically be cloned to be assigned to the new one (like the first `@clone` we saw before). This is perfect for classes that don't have to worry about duplicate instances.

### Serialization

Serialization is a concept you probably won't use very often, but which can help you in some cases. Basically, serialization consists in converting a value to a string. It goes with the unserialization process, which converts a string to a value.

For instance, we could imagine we have the same `Product` class as we saw before. Here is its source code at this point of the book:

```sn
class Product {
  public readonly unique_id: int;
  public readonly name: string;
  public readonly price: int;
  private static counter: int = 0;

  public pln @lazy_clone = true;

  public @construct(@name: string, @price: int) {
    @unique_id = self::counter ++;
  }
}
```

We could now imagine we want to transmit a product over the network, or simply save it to a file. This requires to convert the instance as a string, or at least as a list of bits (because all informations in a computer are written with bits). We also want to be able to make an instance from the transmitted/saved string in order to use the product. So we need to _serialize_ the instance and then _unserialize_ the produced string.

For that, we'll implement two overloads in our class. They are `@serialize` and `@unserialize`, which is pretty explicit, and use the following signature:

```sn
  public func @serialize() : string;
  public static func @unserialize(serial: string) : self;
```

Now let's implement them! First, how to implement serialization? We could produce a human-friendly string, like that:

```sn
  // ...
  public func @serialize() : string {
    return `uid: ${@unique_id} ; name: ${@name} ; price: ${@price}`;
  }
  // ...
```

But there is a problem here: first, the string is not optimized. One of the goal of serializing instances is to produce a small string to fit in a small disk space / be fast to transfer over a network. The second one, which is more annoying, is that'll be complicated to make an instance from these strings. So we can use a trick that is serializing a structure:

```sn
  // ...
  public struct Serialized {
    val name: string;
    val price: int;
  }

  public func @serialize() : string ->
    // Make an object containing the data we want to serialize
    // (thanks to IST)
    // Then serialize it and return the result
    serialize!({
      name: @name,
      price: @price
    });

  public static func @unserialize(serial: string) : self {
    // Unserialize the serialized structure
    val obj: Serialized = unserialize!(serial, Serialized);
    // Make a new product instance and return it
    return new Product(@name, @price);
  }
  // ...
```

#### The lazy way (again)

Exactly like cloning, there is a lazy overload for serialization. More exactly, there are two lazy overloads: one for serializing, and another for unserializing.

If we use lazy serialization, all the members (even private ones) of our class will be put in a structure that will be converted to a string. If we use lazy unserialization, it will attempt to unserialize the given string as a structure made of all the class' members (even private ones), and make a new instance from it before returning it.

Here is the syntax:

```sn
  // ...
  // Implement lazy serialization
  public pln @lazy_serialize = true;
  // Implement lazy serialization
  public pln @lazy_unserialize = true;
  // ...
```

It's also possible to customize the fields that have to be serialized and unserialized. This way, we can avoid to put in a string that would go over the network or be written on a hard drive some confidential informations contained in the private members - or simply to remove some useless informations. It must be a list of strings, like this one:

```sn
  // ...
  public pln @lazy_serial_fields = [ "name", "price" ];
  // ...
```

You now know everything about serialization!

### Inline calls

Inline calls allow us to make a class callable, just like a function. It can takes whatever arguments it wants to and use any return type.

There are two overloads for inline calls: the first one is common to each instance, making the instances callable, and the second one is static and allows the class itself to be called.

Let's take an example:

```sn
class Translator {
  // Here is a function that translates a text
  //  and returns the translated string
  public static func translate(text: string, lang: string) : string {
    // Do some translation stuff here
    // For the example we will return a constant string
    return "Bonjour";
  }

  // Make the class callable
  public static func @call(text: string, lang: string) : string ->
    @translate(text, lang);
}

println!(Translator("Hello", "fr")); // Prints: "Bonjour"
```

Here, the `@call` overload made the class callable. We could implement it for instances:

```sn
class Calculator {
  public func add(left: int, right: int) : int -> left + right;
  public func @call(left: int, right: int) : int -> @add(left, right);
}

val calc = new Calculator();
println!(calc(2, 5)); // Prints: "7"
```

Remember: making the **class** callable as a function requires a static function, while it won't be to make the **instances** callable as a function. We can also implement both the overloads in the same time, of course.

### Friends

Another concept of accessibility is the _friends_. These are resources, listed in a class, that can access its private attributes. Here is how it goes:

```sn
class Product {
  private static counter = 0;
  private id: int;

  public func @construct() -> @unique_id = self::counter ++;

  // List a function as this class' friend
  friend getProductId(product: self) : int;
}

// Define the class' friend function
func getProductId(product: Product) : int {
  // Access the instance's private attributes
  return product.id;
}
```

There are several syntax to set a resource as friend:

```sn
class Product {
  // List a simple function as a friend
  friend func simpleFunction(product: self) : int;

  // List another class' static function as a friend
  friend func AnotherClass::staticFunction(product: self) : int;

  // List a function from another class' instances as a friend
  friend func AnotherClass.instanceFunction(product: self) : int;

  // Even a whole class can be listed as a friend!
  friend class AnotherClass;

  // And even structures!
  friend struct SomeStructure;
}
```

As we will see later, this also works for interfaces, traits and other things.

## Cross-typing

Cross-typing is a very important concept in classes. SilverNight is largely based on it, as it features many useful sub-concepts for programming. In this chapter, we'll them all, before going to the final chapter about classes: the dictionnaries.

### Inheritance

Here is the big part of classes: inheritance. That's a very important concept so be sure to understand it fully.

When declaring a class, we sometimes encounter a problem when we want to make specific instances. For instance, let's say we have a `Hero` class. With it we want to describe a warrior, which has no `mp` but a `rage` attribute that increases when he receives damages which increases its attack points. At the opposite, we have wizards, who don't have `rage` but `mp` to use spell on their target.

The warrior could have a `rage` attribute to check if their rage level, and the wizard could have a `fireball()` method to throw a fireball to the ennemy.

Of course, we could implement this in a single class, by having a `type` attribute for instance that describes if the hero is a warrior or a wizard, and do the check in the two methods we just saw to forbid warriors using fireballs and always keep a nil rage for wizards. But that'd make our code less clear and less maintable, and that'll be even worse if we add new type of heroes (like a dragon that can fly to avoid attacks, or a demon that invokes some demoniac creatures).

A solution to this problem is the _inheritance_. How does it work? Well, it's mostly simple to understand: we will declare a new class that _inherits_ from another called the _mother class_. These classes will be called the _children classes_. In our example, the `Hero` class would be the mother, while two `Warrior` and `Wizard` classes would be the children that _inherits_ from `Hero`.

A class inheriting from another will receive all of its members, including overloads. That means any method that works on the mother class will work on this children. But the specificity of children classes it that they can implement their own members, and rewrite their parent's ones (though they can't remove them). For instance, if the `Hero` class has an `fight()` method, `Warrior` and `Wizard` could rewrite its body (what it does) but not its signature ; they will be forced to have a method with the same signature, even if they rewrite it. But, thanks to polymorphism, they can still define a new method with the same name if it has other arguments (and potentially another return type) - but the mother's method will be inherited anyway.

Now we saw the concept, let's implement it step by step. First, we'll make a skeleton for the mother class:

```sn
virtual class Hero {
  public readonly name: string;
  public readonly hp: int;
  public readonly attack: int;

  public @construct(@name: string, @hp: int, @attack: int) {}

  // Attack an ennemy
  public func fight(ennemy: self) : void {
    // Check if this hero is dead
    if (@hp is 0) {
      println!(`${@name} can't find because he's dead.`);
      return ;
    }

    // Attack the ennemy
    ennemy.receiveDamages(@attack, @name);

    // Check if the ennemy died
    if (ennemy.hp is 0) {
      println!(`${@name} killed ${ennemy.name}!`);
      return ;
    }

    // Receive damages from the ennemy
    @receiveDamages(ennemy.attack, ennemy.name);
  }

  // Receive damages from an ennemy
  public func receiveDamages(amount: int, ennemyName: string) : void {
    // Check if this hero is dead
    if (@hp is 0) {
      println!(`${@name} did not receive any damage because he's dead.`);
      return ;
    }

    println!(`${ennemyName} fights ${@name}.`);

    // Check if the damages are higher than the remaining HP
    if (amount > @hp) {
      @hp = 0;
      println!(`${@name} dies.`);
      return ;
    }

    println!(`${@name} loses ${amount} HP.`);

    // Receives the damages
    @hp -= amount;
  }
}
```

A little subtlety here is the presence of the `virtual` keyword before the `class` one. It's called a _class state_, a concept we'll see later. This one simply indicates the class can't be instanciated, so you can't do `new Hero();` or `val someone: Hero;` - both will throw an error. Instead, we will instanciate the `Hero`'s children classes, if they are not defined as `virtual` too.

Another thing: the `protected` keyword. It kind of acts like `private`, as the member it prefixes will only be available from the inside of the class. But, `private` is a special keyword that, in addition to making the attribute writable only from the inside of the class, will not make it available from its children class. So `Warrior` and `Wizard` wouldn't be able to write it. That's not really a problem, since these attributes don't aim to be modified, but that's a thing we need to think to when making a class that will be inherited by anothers. The `protected` keyword does the same thing than `private` excepted that it makes it available for children classes.

So, now we seen that, let's make our children classes:

```sn
class Warrior extends Hero {
  public readonly rage: int;

  public func receiveDamages(amount: int, ennemyName: string) : void {
    // Call the parent class' `receiveDamages()` method
    parent.receiveDamages(amount, ennemyName);

    // Check if the warrior rage will exceed 20 points
    //  by adding the damages just received
    if (@rage + amount > 20) {
      // Limit them
      @attack += 20 - @rage;
      @rage = 20;
    } else {
      // Else, increase without worrying about the amount
      @attack += amount;
      @rage += amount;
    }
  }
}
```

What happens in this class? First, we tell to the class to inherit from `Hero`, so it keeps all its attributes and methods (including overloads). Next, we declare a new `rage` attribute, which this time is set as `private` because there won't be any class inheriting from it. Then, we redefine the `receiveDamages` method. In it, we use a brand new keyword: `parent`. It is the same as `this`, excepted it refers to the parent class as an instance. For example, `parent.receiveDamages()` will call the `receiveDamages()` method of the **parent class**. This way, we don't have to rewrite the calculation of damages and other checkings - which would make a code duplicate, which is a thing to avoid absolutely in development.

Then, the redefined method increases the rage counter (with a maximum of 20 points) and increases the warrior's attack points, so his attack points will be up to his original value plus 20 points.

We can now write our `Wizard` class:

```sn
class Wizard extends Hero {
  public readonly mp: int;

  public func @construct(@name: int, @hp: int, @attack: int, @mp: int) {}

  public func fireball(ennemy: Hero) : void {
    // Check if remaining MP are enough
    if (@mp < 10) {
      println!(`${name} can't throw a fireball because he doesn't have enough MP.`);
      return ;
    }

    // Decrease remaining MP
    @mp -= 10;

    // Attack the ennemy
    ennemy.receiveDamages(@attack * 2, @name);

    // Check if the ennemy died
    if (ennemy.hp is 0) {
      println!(`${@name} killed ${ennemy.name}!`);
      return ;
    }

    // Receive damages from the ennemy
    @receiveDamages(ennemy.attack, ennemy.name);
  }
}
```

The `Wizard` class also inherits from `Hero`, and adds a new `mp` attribute (private, like `rage` for `Warrior`). It also redefines the constructor, as it now needs a new attribute.

Then, it implements a new method called `fireball()` to throw a fireball on the ennemy, which doubles its attack points for this attack. Pretty powerful.

Now we've done this, let's try our classes:

```sn
let hegor = new Warrior("Hegor", 100, 30);
let jack  = new Wizard("Jack", 120, 10, 35);

hegor.fight(jack);
println!('------------------');
jack.fireball(hegor);

/*
 * Hegor fights Jack.
 * Jack loses 30 HP.
 * Jack fights Hegor.
 * Hegor loses 10 HP.
 * ------------------
 * Jack fights Hegor.
 * Hegor loses 20 HP.
 * Hegor fights Jack.
 * Jack loses 50 HP.
*/
```

Here we are! We implemented a mother class with two children.

### Abstract methods

Let's see a new prefix for class' methods: `abstract`. We already saw what a virtual class was, but now let's see what an abstract a method (because attributes cannot be abstraced) is.

Basically, abstracting a method means that its signature is written in the class, but its body is not forced to. It also forces any children of this class to implement its own version of the method, and this method will be usable in the parent even though its body is in a child.

Here is an example:

```sn
virtual class Hello {
  abstract public sayHello() : string;
}

class World {
  abstract public sayHello() : string {
    println!("Hello world!");
  }
}
```

The first difference we can see between these two classes is that the first one is abstract and not the second one. Why? Because, when we declare an abstract method without its body, it can't of course be used from this class - because the program doesn't know what to do. So it can't be instanciated, and because of it it is stated as a virtual class.

The second class declares an abstract method but with a body, this time. That means any child class will be forced to implement its own version of this method, but the class is still instanciable because we written the method's body in the class.

### Stated classes

As methods can be prefixed in a class, there are also prefixes for classes themselves. _Stated_ classes are standard classes with a keyword prefixing the `class` one, called the _class' state_. There are a few ones:

#### `abstract` classes

We already saw this state, it means the class cannot be instanciated, so it must have at least one child class that will be instanciable (if it isn't prefixed with the same keyword too).

#### `final` classes

Final classes are classes that can't be inherited. They can be instanciated, though.

#### `static` classes

Static classes are both `abstract` and `final` classes. They are not instanciable and not inheritable. This means all the class' members **must** be static.

#### `unique` classes

Unique classes are a special case where the class has one unique instance and cannot be instanciated later. Here is an example with a translation class:

```sn
unique class Translation as tr {
  public func translate(text: str, lang: str) : string {
    // Do some stuff here
    return "Bonjour";
  }

  public func @call(text: str, lang: str) : string ->
    @translate(text, lang);
}

// Let's try it!
val instance = new Translation(); // ERROR
Translation("Hello", "fr"); // ERROR

tr.translate("Hello", "fr"); // Returns: "Bonjour"
tr("Hello", "tr"); // Returns: "Bonjour"
```

As you can see, the `Translation` class does not even exist, in reality. There is only the `tr` instance.

#### `readonly` classes

Read-only classes are classes that can't be written from the outside of the class. All attributes must be set as read-only or be protected/private. Protected and private attributes that are not marked as read-only won't available from the outside of the class (as for a standard class).

### Typecasting

In SilverNight, typecasting is the concept of converting a given type into a primitive type, for example converting a string to an integer or a structure to a string. But it's not magic, types need to have a _transtyping overload_ for each primitive type they want to be typecastable to.

These overloads have to following signature:

```sn
  [public|protected|private] @toType() : type;
```

If they are public, casting will work anywhere. If they are protected/private, they will work only from the inside of the class (and not in children if private).

For examlple, casting a type to a boolean (`bool` or `Boolean` type) requires the `@toBoolean` overload. Here is an example:

```sn
class MyInteger {
  private value: int;

  public func set(@value: int) : void {}
  public func get() : int -> @value;

  public func @toBoolean() : bool -> @value isnt 0;
}
```

Now, `MyInteger` instances can be casted to booleans (`false` if they are equal to 0, `true` else).

Here is the list of all typecasting overloads:

```sn
  // ...
  public func @toBoolean()   : bool;
  public func @toInteger()   : int;
  public func @toFloat()     : float;
  public func @toString()    : string;

  public func @toNumber()    : Number;
  public func @toPrimitive() : string;
  // ...
```

There two last overloads can be automatically available even if they are not written by hand: `@toNumber` and `@toPrimitive`. The first one returns a `Number` instance but exists if and only if either `@toInteger` and/or `@toFloat` is implemented. If `@toFloat` exists, it will return its result, else it will return `@toInteger`'s one.

The `@toPrimitive` overload will simply return a string if **any** typecasting overload is implemented. It will give priority to `@toString`, then to `@toNumber`, then to `@toBoolean`. That's as simple as that. It can be useful in some cases like in interfaces and/or traits like we'll see later.

**NOTE :** `Number` is the mother class of both `int` and `float`, themselves respectively mothers of all integers types like `uint8` or `int32` for the first one and floating-points types like `ufloat` or `double` for the second one.

A concrete example of using these overloads is when using the `println!` macro. It takes as an argument any instance implementing `@toPrimitive`, gets this overload's result, and prints it in the output. There are several usages of it, but most are to use them in interfaces and traits.

### Sub-typing

Here is a very useful feature that simply acts like this: any children class will be accepted if one of its ancestors is required.

To put it clearly: if a function asks for a `Vehicle` and we make a `Motorcycle` child class that inherits from `Vehicle`, the function will accept `Motorcycle` instances.

Here is an example:

```sn
class Vehicle {
  public func accelerate() : void -> println!("Vroom!");
}

class Motorcycle extends Vehicle {
  public func accelerate() : void -> println!("vroom vroom!");
}

func acceleration(vehicle: Vehicle) : void {
  vehicle.accelerate();
}

acceleration(new Vehicle()); // Prints: "Vroom!"
acceleration(new Motorcycle()); // Prints: "Vroom vroom!"
```

Be aware though: when declaring a resource as a type and using a child type instead, you won't be able to use its new members. The only difference can come from the rewritten methods that already existed in the type we declared, these ones will use the code of the child type.

```sn
class Vehicle {
  public func accelerate() : void -> println!("Vroom!");
}

class Motorcycle extends Vehicle {
  public func accelerate() : void -> println!("vroom vroom!");
  public func stunt() : void -> println!("Wow!");
}

val motorcycle: Vehicle = new Motorcycle();
motorcycle.stunt(); // ERROR because `stunt` is not part of the `Vehicle` class
```

That may appear to be simple and not very useful at the moment, but as we will see later that's an extremly useful concept. Also, note there is a way to ask for a specific type and not its children, thanks to the `#mustbe<T>` directive. Yes, directive can be templated. Here is an exemple:

```sn
func precise(vehicle: #mustbe<Vehicle>) : void ->
  vehicle.accelerate();

let car        : Vehicle    = new Vehicle();    // Works fine
let motorcycle1: Vehicle    = new Motorcycle(); // ERROR
let motorcycle2: Motorcycle = new Motorcycle(); // ERROR
```

### Interfaces

Because understanding the concrete point of an interfaces isn't always easy, let's take an example to introduce the concept.

Let's say we have a function that takes two arguments of any type, and add them as integers. In order to perform the addition, they need to be convertible to integers, of course. So our function will take any argument that implements the `@toInteger` overload. But how can we do that?

The first idea would be to make a virtual class called `ConvertibleToInt` with an abstract method called `@toInteger`, like this:

```sn
virtual class ConvertibleToInt {
  abstract func @toInteger() : int;
}
```

But that would be a very bad idea. Why ? Because all classes would have to inherit from it to be used in our function so it would restrict the accepted type of arguments to the only classes that implement it. Right from the start it excludes all the native types (which doesn't inherit from your own class, of course) plus all the classes you haven't made yourself (which are part of a library, for example) and the classes that already inherits from a class, because a class can't have multiple mother classes. This also would be very heavy to write.

So, the solution to this problem is to use an interface. An interface is simply a list of functions and attributes a class **must** implement - it can't write the body of functions. When declaring a class, you explicitly tell what interface(s) it uses, and not implementing any of the interface's members will result in an error.

Also, and that's the great point about interfaces, any class that implements all of its members (with the exact same signature, accessibility etc.) will be considered as implementing the interface itself. If we use it with sub-typing, you could easily imagine to solve our problem.

Try to find the solution by yourself. The solution is just below:

```sn
interface ConvertibleToInt {
  public func @toInteger() : int;
}

func add(left: ConvertibleToInt, right: ConvertibleToInt) : int {
  return int(left) + int(right);
}
```

**NOTE :** Writing `int(value)` calls the `int` class as a function with `value` as an argument to convert it to an integer. It accepts any value implementing the `@toInteger` value, like our interface.

If we try this code, it works perfectly fine.

#### Self-references

An interface can use the `self` keyword to refers to the class that is implemeting it. Here is an exemple:

```sn
interface Duplication {
  public func duplicate() : self;
}

class Product {
  public readonly name: string;

  public func @construct(@name: string) {};

  public func duplicate() : self -> new Product(@name);
}
```

The `parent` keyword is also available.

#### Native typecasting interfaces

Here are some native typecasting interfaces we can use in our programs:

* `BooleanConvertible`
* `IntegerConvertible`
* `FloatConvertible`
* `NumberConvertible`
* `Stringifyable`
* `Clonable`
* `Freezable`
* `Serializable`
* `Randomizable`
* `Primitivable`

**NOTE :** `Randomizable` forces to implement the `@random` overload that generates a random element of the current class.

#### Implemeting interfaces in a class

To implement an interface in a class, simply use the `implements` keyword like the `extends` one:

```sn
class Two implements ConvertibleToInt {
  public func @toInteger() -> 2;
}
```

Think to it if you have to accept any type of value that simply implements some attributes and/or methods.

#### The `Any` interface

The smallest interface in SilverNight is the `Any` interface. It allows us to take absolutely any instance of any class as an argument. Here is its full declaration:

```sn
interface Any {
  // Nothing here
}
```

Yes, this interface is empty. Because it is empty, every single class implements it. So every class will match the requirement of implementing the `Any` interface, and we can use it in our programs!

But, because it is empty, we can't use **any** member of the values we get from it. So, how could we ever need it? That's because of things like reflection we'll later, that can grant information on absolutely any type, and with some macros. But most of the time, we simply won't use it. Simply remember that if you need to accept any type of value in one of your functions for instance, this interface exists.

### Traits

Traits act kind of virtual classes. The main difference though is they can't implement static members, but they can still write the body of the function they declare. They aim to provide _horizontal reuse_, while virtual classes aim to provide _vertical reuse_ (plus the fact they can implement static members).

A good example of traits is when you want to inherit from multiple classes. This is absolutely impossible in SilverNight, but you implement multiple traits. Here is how it goes:

```sn
trait Vehicle {
  public val speed: float;
  public func accelerate() : string -> "Vroom !";
}

trait Wheeled {
  public val wheels: uint;
}

class Car {
  use Vehicle, Wheeled;
}
```

We can now try it:

```sn
// Sub-typing works fine
let car: Vehicle = new Car();
// Try a function
printlnl!(car.accelerate()); // Prints: "Vroom!"
```

## Dictionaries in depth

Let's see the final part about classes: dictionaries. As you already, dictionaries in SilverNight are instances of the `Dictionary` class. But how do they really work? That's what we will see in this chapter, as well as how to make your own dictionary classes to store key/values (or more) dictionaries with a custom behaviour.

### Templates

Here we are, another of the most important concepts of Object-Oriented Programming: the templates. In fact, you won't use them explicitly very often, but you will use them _implicitly_. To be exact, you already do this as lists and arrays use templates, as we will see now.

Remember when we talked about `List` and `Array` as _templated_ types? This meant these two classes take a class reference, called a _template_, to work.

Basically, a template is the name of a class. Any class, function, structure... can use one or several templates to work, and it will register it as an _alias_.

To take an example, let's say I have a structure that aims to associate any kind of value with an identifier. With what we saw until now, we can't do that because there is no way to accept any type in a structure. That's where the templates come.

```sn
struct ValueWithID<T> {
  val id: int;
  val value: T;
}
```

Let's detail this. We have a structure, called `ValueWithID`, with two attributes: `id` (which is an integer) and `value`, which is an instance of `T`. Both are constants to ensure they won't change after the structure's creation.

Here, `T` is called the structure's _template_. When a structure is declared with a template, we can't just write `val something: ValueWithID`, but `val something: ValueWithID<SomeClass>`. Then, `T` will simply refer to `SomeClass`, so `value` will need to be an instance of `SomeClass`. Here is an example:

```sn
struct ValueWithID<T> {
  val id: int;
  val value: T;
}

val test: ValueWithID<string> = {
  id: 1,
  value: "Hello !"
};
```

There's also a feature in SilverNight called _Inferred Templating_, which acts like IST for structures and ICT for callbacks: it _guesses_ the template's type, and can be combined with both IST and ICT. So, we can declare our `test` constant like this:

```sn
val test = {
  id: 1,
  value: "Hello !"
};
```

That's more simple, right? Now, let's see an application in classes. We will make a class that acts as a dictionary: it will associate a key (of any type) to a value (of any type). Here is how it could look like:

```sn
class KindOfDict<K, V> {
  private keys: K[];
  private values: K[];

  public func has(key: K) : bool -> @keys.has(key);

  public func set(key: K, value: V) : void {
    // If this key is not already known...
    if (not @has(key)) {
      // Create it
      @keys.push(key);
      // Add the new value
      @values.push(value);
    } else
      // Else, associate the new value to the existing key
      @values[@keys.indexOf(key)] = value;
  }

  public func get(key: K) : V ->
    // Return the value associated to the key
    @values[@keys.indexOf(key)];
}
```

**NOTE :** As for a real dictionary, an error will be thrown if someone tries to get the value associated to an unknown key. The `has()` function is here in order to avoid such a thing to happen.

Here, we use two templates for our class: `K`, which refers to the keys, and `V` for the values. We can know make a new "dictionary" like this:

```sn
val myDict: KindOfDict<Array<int>, string>;

myDict.set([ 2, 5 ], "Message 1");
myDict.set([ 4, 8, 3 ], "Message 2");

println!(myDict.get([ 2, 5 ])); // Prints: "Message 1"
```

As you can see, templates you can even be other templated classes. Because, yes, both `Array` and `List` are templated types - they are in reality custom dictionary classes this chapter aims to present.

#### Optional templates

Many native functions use optional templates. They work exactly like optional arguments for functions:

```sn
struct Data<T = float> {
  val id: int;
  val value: T;
}

val test: Data = {
  id: 5,
  value: 2.8
}; // Works fine
```

#### Restricting templates

Because the chosen template will always vary, we can't instanciate it nor use its methods/attributes. But we may want to interact with the template or its instances, by ensuring it implements some methods or attributes. That's possible, and here is the syntax:

```sn
// Make a structure
struct Data<T implements Stringifyable> {
  val value: T;
  func stringify() : string = () -> string(value);
}

// Make a class that works with the structure
class Working {
  public func @toString() : void -> "It's working!";
}

// Make a class that doesn't work with the structure
class NotWorking {
  public func @toInteger() : int -> 28;
}
```

Let's try this code:

```sn
// This works
val workingTest: Data<Working> = {
  value: new Working();
};

println!(workingTest.stringify()); // Prints: "It's working!"

// This doesn't work
val notWorkingTest: Data<NotWorking> = {
  value: new NotWorking()
}; // ERROR because `NotWorking` does not implement `ConvertibleToString`
```

Here are some examples of constrained templates:

```sn
T extends SomeClass;

T implements SomeInterface;
T implements SomeInterface1, SomeInterface2;

T use SomeTrait;
T use SomeTrait1, SomeTrait2;

T extends SomeClass implements SomeInterface use SomeTrait;
```

Pretty powerful, right? We can this syntax to force the templates to do codes like this:

```sn
class StringDict<K, V implements Stringifyable> extends KindOfDict<K, V> {
  public stringify(key: T) : string -> string(@values[@keys.indexOf(key)]);
}
```

That's all! Note that, if a class inherits from another that uses some template(s), it must have the exact same number of templates (must it is not forced to use the same names).

For information, the `T`, `X`, `Y`, `Z`, `K` and `V` names are reserved to templates.

### Dictionary classes

Here is an heavy part of this chapter: how to make custom dictionaries.

First, what's a dictionary, exactly? In SilverNight, a dictionary is any instance of a dictionary class. These classes provides an instance that aims to associate a key to a value, whatever their type and content are, but with a single type for keys and a single type for values.

#### The truth about vectors

The `Array` and `List` classes are in fact dictionaries. They both inherits from the `Vector` dictionary class, which associates integers to any type of value. The integers in question cannot be manually manipulated, they are automatically handled by the dictionary class, to keep keys from 0 to any positive integer.

#### How to make dictionary classes

Dictionary classes (also called custom dictionaries) are defined this way:

```sn
// K = type for keys
// V = type for values
dict Custom<K, V> {
  // Code here
}
```

There are a special kind of classes. First, some overloads **must** be implemented. These are `@get`, `@set`, `@unset`, `@has`, `@keys` and `@values`, which are specific to dictionaries and can't be used in standard classes. All other overloads (like `@clone` or `@random`, even `@construct` and `@destruct`) can be implemented but are not required. Also, dictionary classes must take two templates (they can have any name) but they can force the type of keys and/or the type of values by writing a class' name instead (like `dict Vector<int, V>` for vectors).

Let's detail these overloads:

```sn
// K = type for keys
// V = type for values
dict Custom<K, V> {
  // Get a value from a key
  public func @get(key: K) : V;
  // Associate a value to a key
  public func @set(key: K, value: V) : void;
  // Delete a key (and the value it refers to)
  public func @unset(key: K) : void;
  // Check if a key is known
  public func @has(key: K) : bool;
  // Get the list of all keys
  public func @keys() : List<K>;
  // Get the list of all values
  public func @values() : List<V>;
}
```

As always, the return type of these overloads is omittable, put they are written here to see their complete signature.

About `@keys` and `@values`, their behaviour is a little special. They can be called automatically, when iterating the dictionary through a loop (we'll see that soon), or manually thanks to a function. If they are called automatically (in a loop iterator, for instance), the return value will be kept as it is. But if they are called manually, the return value will automatically be cloned - and there's no way to prevent it. Why this behaviour? Because, if a loop iterates through the list of keys/values, there is no need to clone the values as the list will not be written. But if the list is retrieved manually and written by some piece of code, this could cause some garbage in the dictionary - because some dictionary use a special behaviour like forbidding duplicate values or restricting keys to a specific list of names.

Most of the time, custom dictionaries should always inherit from the `Dictionary` class (the same one that is used when using `#Dynamic` in a key/value association with IST). The syntax is the same as for classes:

```sn
dict Custom<K, V> extends Dictionary<K, V> {
  // Do some stuff here
}
```

This will inherits all functions that comes with basic dictionaries, like `.filter()` or `.map()`. It will grant access to two protected members, `keys` and `values`, which are arrays referring respectively to the dictionary's keys and its values, as well as all overloads you can implement in a dictionary with no restricted template.

### Exploring dictionaries

#### Dealing with public members

As we saw before, dictionaries associate a key to a value. So, getting any index from the dictionary, like `mydict.someIndex` will return a key, whatever happens. But, what about public members?

For example, the `Dictionary` class implements a `.fill()` function, so we can do `mydict.fill("hello")`. But then, `mydict.fill` won't return a value of the dictionary, right?

This is a conception choice that hopefully has a solution if we want to access any index. In order to be assured to get the value corresponding to the key we have, we simply have to do: `mydict[index]`, where `index` is an instance of `K` (the dictionary's key type). Getting an index between brackets means we're explicitly trying to get an index, not a public member, while `mydict.index` means we are first trying to get a public member if it exists, else to get the value associated to this key (if it exists).

#### Using loops to iterate dictionaries

Loops are our best friend when exploring dictionaries. While we can still get access to the list of a dictionary's keys thanks to `mydict.keys()` and to its value with `mydict.values()`, the most simple remains to use the `foreach` loop:

```sn
// Explore a dictionary using its keys
foreach (let key in myArray)
  println!(key);

// Explore a dictionary using its values
foreach (let value of myArray)
  println!(key);

// Explore a dictionary with both its keys and its values
foreach (let key => let value of myArray)
  println!(key, value);
```

#### The case of vectors

This is very simple: a `Vector<T>` (`List` or `Array`) is a `<int, T>` dictionary (with different members, though). That's as simple as that.

#### Collections

There is a native type called `Collection<T>`, which is a strict equivalent to `Dictionary<string, T>`.

#### Shortened typing

A way to simplify the writing of dictionary names is to use the shortened syntax, as it follows:

```sn
// Collection<double> <=> Dictionary<string, double>
val dict: { double };

// Dictionary<string, int>
val dict: { string, int };

// Dictionary<string, Dictionary<int, float>>
val dict: { string, { int, float } };

// Dictionary<Dictionary<string, int>, float>
val dict: { { string, int }, float };

// Dictionary<Dictionary<Dictionary<string, int>, float>, string>
val dict: { { { string, int }, float }, string };
```

## Advanced concepts

Here is a transitional chapter between the end of object-oriented programming and deeper concepts of SilverNight like errors, pointers or packages. The notions we will see here may not be used in every single program, be they can still be useful.

### Future declarations

Here is a concept which will be especially useful in some conditionals. Futurely-declared resources are resources that are explicitly typed and don't have an initial value.

If we create a mutable with `let variable: Collection;` type for example, an instance of the `Collection` class will be created and assigned automatically and transparently to `variable`. For example:

```sn
let hello: SomeType;
```

Is **strictly equivalent to** as:

```sn
let hello: SomeType = new SomeType();
```

With a future declarations, the initialization is not automatically done, so the resource has no initial value.

```sn
// Mutables
decl let nums: List<int>;

// Constants
decl val nums: List<int>;

// Frozens
decl frozen nums: List<int>;
```

Here, we declare `nums` as an instance of `List<int>`. But because it is not initialized, we cannot access its value. We instead have to initialize it first:

```sn
decl let nums: List<int>;
// Do some stuff
nums = new List<int>;
```

This also works for constants and frozens, so that's also a great way to declare a read-only resource without assigning its definitive value directly.

Be aware, trying to access a futurely-declared resource before it is initialized will result in an error!

#### A concrete example

A practical example of future declarations: the problem of list initialization.

Here is the program we want to make:

1. Declare a list of integers with 4096 cells.
2. Generate a random boolean.
3. If it's "true", fill the list with zeros
4. If it's "false", fill the list with ones

The problem is: if we simply declare the list with `val`, we create a `List<Vehicle>` instance that will be filled with vehicles later. So this will generate 4096 instances of the `Vehicle` class at the same time the list is declared, and then we will make again 4096 instances in our `if` block. Performances are so divided by 2.

In order to avoid this problem, we can declare the list using `decl`. When the resource is declared, no instance is created, and we will only instanciate it in our conditional block, so "only" 4096 instances of `Vehicle` will be created, instead of 8192 with the previous method - that's a considerable speed up.

Here is how it works:

```sn
decl let tableau: uint[4096];

if (bool.random())
    tableau.fill(0);
else
    tableau.fill(1);
```

#### The problem with future declarations

There is a problem with future declarations, though. If we are not aware, we could try to use an not-initialized resource, which would result in an error.

That's why we should always be careful when using them.

#### How optimization can replace future declarations

Also, always think about optimization. This can avoid usage of the `decl` keyword, which can cause some troubles if not used correctly. Below, we see how to optimize our program in order to reduce the number of lines, then simply to remove future declarations.

```sn
// Optimization 1: Reduce the number of lines
decl let tableau: uint[4096];
tableau.fill(bool.random() ? 0 : 1);

// Optimization 2: Remove the "declare" keyword
let tableau = new List<uint>(4096, bool.random() ? 0 : 1);
```

To conclude, this keyword is great because you avoid to create thousands of instances for nothing, and sometimes we simply just don't want to initialize our resosurce because of something. But, we must use it only when it's needed, because it can make our code more confusing as we don't always see where the resource is definitely initialized.

#### The declaration operator

Here is a useful operator when dealing with futurely-declared resources. It allows us to assign something to it if, and only if, it hasn't been initialized yet. Here is how it goes:

```sn
decl let name: string;
// Do some stuff here...
name ?= "Jack";
```

Here, `"Jack"` will be assigned to `name` only if it hasn't been initialized yet.

#### Check if a resource has been initialized

There's also a macro to check if a futurely-declared resource has been initialized, the `is_init!` macro.

```sn
decl val name: string;

if (not is_init!(name))
  println!("`name` has not been initialized yet.");

name = "Jack";

if (not is_init!(name))
  println!("`name` has not been initialized yet.");
```

Only the first `println!` will be called, because in the second condition `name` has been initialized.

### Bindings

A useful concept when using libraries with a lot of resources is the _bindings_. It consists in applying an alias object on a function to extract resources in the local scope.

Let's imagine we have an `engine` class instance with a `run` function, which takes as an argument a function. This game engine runs the function but it also wants to provide a huge number of functions to manage the scene, the collisions, the geometry, the physics, etc.

A first solution would be to provide them each one after another as an argument. But this would result in a lambda with thousands of arguments, so that's not a good idea, even with the `#auto` lambda (because we still have to write the argument's name and order).

Another solution would be to make a structure with functions in it, like:

```sn
struct EngineFunctions {
  init = engine.init;
  createScene = engine.createScene;
  getScene = engine.getScene;
  /* ... and so on */
}

val functions: EngineFunctions;
```

This works but involves to create a large structure, and then make an object with it, then give it as an argument. Putting aside the fact it is really heavy, all the functions would need to be called with `functions.init()`, `functions.createScene()` etc. which is long to write and heavy too if we call them multiple times. Plus, there's no difference between writing `engine.init()` or `engine.createScene()`.

That's where we use bindings. Bindings act like plain structure that links a name to a resource. Let's take an example:

```sn
func run(callback: lambda () #bind
  {
    printInConsole: "println!",
    sayHello: "println!(\"Hello \" + ${1})",
    sayHappyBirthday: "println!('Happy birthday ' + ${1} + ' you are now ' + ${2} + ' years old!')"
  })
  : void -> callback();
```

Here, `myBindings` generates several links.

* The first one simply aliases `println!` as `printInConsole`, s we can do `printInConsole("Hello")`.
* The second one uses `${1}` in its body, so it acts as a function and takes one, and only one argument, that cannot be omitted. Doing `sayHello("Jack")` will result in `println!("Hello" + "Jack")`.
* The third one acts like the first one, but with two arguments. So writing `sayHappyBirthday("Jack", 28)` will result in `println!('Happy birthday ' + 'Jack' + ' you are now ' + 20 + ' years old!')`. Thanks to typecasting, `20` will be understood to `"20"`.

So, we can use the `run` function like this:

```sn
run(() -> {
  #bind;

  printInConsole("Hello, world!");
  sayHello("Jack");
  happyBirthday("Jack", 28);
});
```

This will work as expected, even if the three functions we use in the callback don't really exist but are part of the bindings object. Note that `#bind` directive at the beginning of the callback: it means we know a bindings object will be applied to it and that we accept it. This is needed because bindings can also rewrite the native functions/macros, so the program needs to be sure we really want to perform the binding.

#### Using a declared bindings object

Because writing bindings is heavy in a function's signature (like we saw), and because we may want to re-use bindings several times, we can declare the bindings as an object to use them later. The bindings object is a plain structure linking a string (the name) to another string (the resource). Here is how it goes:

```sn
pln engineBindings = #makebindings {
  printInConsole: "println!",
  sayHello: "println!(\"Hello \" + ${1})",
  sayHappyBirthday: "println!('Happy birthday ' + ${1} + ' you are now ' + ${2} + ' years old!')"
};
```

This is all! We can now rewrite our `run` function:

```sn
func run(callback: lambda () #bind engineBindings): void -> callback();
```

### Constrained types

Sometimes we want to get restricted values from a specific type. For example, if we make a function named `treatCars` that takes a `Vehicle` instance as a parameter, we could only want to accept vehicles with four `wheels` or less.

This time, because we haven't seen any feature that could achieve it, let's just see how it we could do it: with _constrained types_. Assuming we have this code:

```sn
class Vehicle {
  public readonly wheels: int;
  public func @construct(@wheels: int);
}

val car = new Vehicle(4);
val motorcycle = new Vehicle(2);
```

Our function will have this look:

```sn
func treatCars(car: Vehicle with (c -> c.wheels <= 4)) : void ->
  println!(`This vehicle has ${car.wheels} wheels.`);
```

Here, the `with` keywords indicates a constrained type. At its left, we write the type we want to constraint, and at its right a callback (the constraint).

But how does it work? This is simple: when we read the value, it acts exactly like if we didn't put a constraint on its type. But when we try to write it (assign something else), the callback will be ran with an argument, the value we are trying to assign. It could also receive a second argument, which would then be the current value of the resource. As you can see, ICT works in the constraint callback because arguments' types as well as its return type can be guessed.

If we put aside the fact that writing is controlled by a callback, constrained types act **exactly** like standard types: sub-typing work with them (in the example above, writing `Vehicle` instead of its constrained version would accept it as well).

Here is an exemple to better understand the concept:

```sn
func treatCars(car: Vehicle with (c -> c.wheels <= 4)) : void {
  c = new Vehicle(2); // Works fine
  c = new Vehicle(4); // Works fine
  c = new Vehicle(8); // ERROR because the constraint returned `false`
}

treatCars(new Vehicle(4));
```

When the resource is written, the callback receives its value (plus the current value of the resource if it takes two arguments), and returns a boolean. If it accepts the changes, it will return `true` (in our case, this will happen only if the vehicle has four wheels or less). Else, it will return `false` and the writing will be rejected, which will result in an error.

But, because of the need to match the constraint, constrained resources cannot be declared without an initialization value. Here is an example:

```sn
let car: Vehicle with (c -> c.wheels is 4); // ERROR
let car: Vehicle with (c -> c.wheels is 4) = new Vehicle(4); // Works fine
```

Also, because we could want to re-use a constrained type later, the `#type` directive allows us to register:

```sn
#type Car is Vehicle with (c -> c.wheels is 4);

let car: Car;                  // ERROR
let car: Car = new Vehicle(2); // ERROR
let car: Car = new Vehicle(4); // Works fine
```

### Macros

Remember the very first "function" we saw in this book? Yes, this was `println!`. Why there are quotes about "function"? Because `println!` is not a function. It's a macro.

But what's a macro, anyway? A macro is simply a function that replaces some parts of the code by anothers. To take, an example, `println!` will replace the arguments you give to it by `Output::println(...<your arguments>...)`.

To understand better the concept, here is how we define a macro:

```sn
#macro sayHello(name: string) -> println!(`Hello, ${name}`);
```

How do we use the macro then? Like this:

```sn
// Call the macro
sayHello!("Jack");

// Will produce:
println!(`Hello, Jack`);

// Which will itself produce:
Output::println(`Hello, Jack`);
```

As you can see, a macro is simply a way to simplify the writing of a call. It would be heavier to write `Output::println` each time we want to display something in the console, right? That's why the `println!` macro is here. And as you can guess, the `!` symbol indicates we are calling a macro and not a function.

Macros can have several arguments, which must be typed. But it can also have a return type if it is ensured to return a specific type of value. For example, in our example, because `println!` is void-typed, the macro will return a `void`. So, we write:

```sn
#macro sayHello(name: string) : void -> println!(`Hello, ${name}`);
```

One of the native macros can be useful when using arguments. In fact, when writing the same macro as above but like this:

```sn
#macro sayHello(name: string) : void -> println!("Hello, " + name);
```

Using it will almost certainly throw an error. Why? Because it would produce this result:

```sn
// Call the macro
sayHello!("Jack");

// Will produce:
println!("Hello, " + Jack);
```

Until a `Jack` resource is declared, the code above will throw an error because of an undefined reference. This is due to the fact every argument given to a macro is gave as a plain content. The solution to this problem is to use the `uneval!` primitive.

```sn
#macro sayHello(name: string) : void -> println!("Hello, " + uneval!(name));
```

Also note that macros can use a special type for their arguments, that are not available for standard functions. It's the `#plain` type, which prevent the arguments from being checked and evaluated. For example, the following code will work fine:

```sn
// Declare the macro
#macro sayHello(name: #plain) : void -> println!("Hello, " + name);

// Call it
sayHello( 'Jack' );
// This will produce:
println!("Hello, " +  'Jack' );
```

As you can see, even the spaces are kept in `name`. Note that plain arguments can also be unevaluated to a string:

```sn
// Declare the macro
#macro test(name: #plain) : void -> uneval!(name);

// Call it
println!(test( 'Jack' ));
// This will produce:
println!(" 'Jack' ");
```

### Overloading operators

Superoverloads are overloads that don't act only as a class level, but as the whole program's level. Some of them work with some concepts we haven't seen yet, so we'll only see operators superoverloads.

How do they work? That's simple: each operator superoverload overwrites the behaviour of an operator. Here is the list:

* `@plus` (`+`)
* `@less` (`-`)
* `@times` (`*`)
* `@divide` (`/`)
* `@modulo` (`**`)

You can see the matching operator on the right of the corresponding superoverload. Each of them take two arguments, and return a new value. Let's see an example: we have a class called `BankAccount`, with a public readonly member called `money` and a method to add and substract money from the account. We now want to be able to add two bank accounts. Here is how we could do it:

```sn
class BankAccount {
  public readonly money: int with (c -> c >= 0);
  public func @construct(@money: int);
  public func add(amount: int) : void -> @money += amount;
  public func sub(amount: int) : void -> @money -= amount;
}

let account1 = new BankAccount(1000);
let account2 = new BankAccount(2000);

func @plus(left: BankAccount, right: BankAccount) : int ->
  left.money + right.money;

println!(account1 + account2); // Prints: "3000"
```

That's as simple as that. Note that, conventionally, an operator superoverload's arguments are called `left` and `right` - even though we're not forced to call them this way.

We could also implement a way to handle operations between bank accounts and numbers:

```sn
func @plus(left: BankAccount, right: Number) : Number ->
  left.money + right;

println!(account1 + 20); // Prints: "1020"
```

There are though some operators that can't return any type. These are the logical operators, which must return a boolean. Here is the list :

* `@equal` (`==`)
* `@greater` (`>`)
* `@smaller` (`<`)
* `@greater_eq` (`>=`)
* `@smaller_eq` (`<=`)

So, we could compare two bank accounts:

```sn
func @equal(left: BankAccount, right: BankAccount) : bool ->
  left.money is right.money;

println!(account1 == account2); // Prints: "false"
println!(account1 == new BankAccount(1000)); // Prints: "true"
```

This works the same way for the other logical operators.

#### Order-aware superoverloads

Some superoverloads can be implemented automatically in some ways: if we define the `@equal` superoverload, the `!=` operator will also work and return the opposite of `@equal`. If we implement the `@greater` superoverload, `@smaller_eq` will automatically be implemented.

To avoid this behavior, simply write:

```sn
func @equal(left: BankAccount, right: BankAccount) #only : bool ->
  left.money is right.money;
```

This will prevent the `!=` operator from being automatically implemented as the opposite to our `@equal`.

#### Reversable superoverloads

Also, by default, implemeting a superoverload will preserve the argument's order. This means the following code:

```sn
func @equal(left: BankAccount, right: int) : bool ->
  left.money is right.money;

println!(new BankAccount(1000) is 1000); // Prints: "true"
println!(1000 is new BankAccount(1000)); // ERROR
```

Will result in an error, because `@equal` only takes on its _left_ a `BankAccount` instance, and on its right an `int`. To make the superoverload working whatever the arguments order is without rewriting it with the opposite order, we can simply use the `#reversable` directive:

```sn
func @equal(left: BankAccount, right: int) #reversable : bool ->
  left.money is right.money;

println!(new BankAccount(1000) is 1000); // Prints: "true"
println!(1000 is new BankAccount(1000)); // Prints: "true"
```

This now works as expected. Note that `#only` and `#reversable` can be combined:

```sn
func @equal(left: BankAccount, right: int) #reversable #only : bool ->
  left.money is right.money;

println!(new BankAccount(1000) is 1000); // Prints: "true"
println!(1000 is new BankAccount(1000)); // Prints: "true"
println!(new BankAccount(1000) isnt 1000); // ERROR
```

#### Templating

It's possible to use templates on superoverloads, but only if these templates are part of the type of at least one argument of the function. Here are some examples of signatures:

```sn
// Doesn't work because "T" cannot be guessed
func @plus<T>(left: string, right: int) : int[];

// Doesn't work because "T" cannot be guessed
func @plus<T>(left: string, right: int) : T;

// Works fine
func @plus<T>(left: T, right: int) : bool;

// Works fine
func @plus<T>(left: string, right: Dictionary<int, T>) : string[];
```

## Errors

In SilverNight, behaviours that can't natively be handled throw errors. For instance, dividing a number by zero will throw an error because the program doesn't know how to handle it.

### How errors are thrown

Throwing an error consists in throwing an _instance_ of an error class. What's that? This is simply a child class of the native `Error` class, or `Error` itself. After instanciating it, the error is thrown using the `throw` keyword, like this:

```sn
throw new Error("Something bad happened.");
```

Here, `throw` indicates it will throw an error. The instance written on its right is the error we want to throw. If we write the code above in our programs, they will crash with this error message (if debugging is enabled).

Here is the signature of the `Error` class (and the structure it uses):

```sn
struct ErrorStep {
  val file: string;
  val line: int;
  val function: int;
  val column: int;
}

class Error {
  public readonly message: string;
  public readonly traceback: List<ErrorStep>;
  public func @construct(@message: string);
  public func @toString();
}
```

As you can see, an error instance has a `message` attribute that is the message we give to it when we instanciate the class, and a `traceback` which is a list of functions that were ran until the error. Here is an example:

```sn
func a() : void -> b();
func b() : void -> c();
func c() : void -> throw new Error("Test");

a();
```

If we run this script from a file named `src.sn`, `traceback` will be equal to the following object:

```sn
[
  {
    file: "src.sn",
    line: 3,
    column: 20,
    function: "global.c"
  },

  {
    file: "src.sn",
    line: 2,
    column: 20,
    function: "global.b"
  },

  {
    file: "src.sn",
    line: 1,
    column: 20,
    function: "global.a"
  },

  {
    file: "src.sn",
    line: 5,
    column: 1,
    function: "global.main"
  }
]
```

The `global` object refers to resources that are defined in a global context, which means they aren't defined inside a class for example. The `line` and `column` refers to the moment the current `function` calls another one. For the last function, it refers to the location of the `throw` keyword that has been ran.

### `try` and `catch` errors

Errors can either be automatically thrown (e.g. when dividing by 0) or manually (thanks to the `throw` keyword). But errors does not only aim to make the program crash when something goes wrong ; it also provides a way to understand something hasn't worked as expected and do something in consequence.

For exampe, we could imagine using a function to read a file. Reading the file could fail because of numerous reasons (file does not exist, error while reading the disk, invalid files table, etc.). Still, we don't want our program to stop just because the reading failed.

The same thing applies if we do a division, we could want to be able handle division errors. Here is an example:

```sn
func divide(left: int, right: int) : float ->
  float(left) / right;

divide(2, 5); // Returns: 0.4
divide(2, 0); // ERROR
```

To catch the errors, we use a couple of blocks named `try` and `catch`. In the first one, which has no block head, we put the code that could throw an error. In the second one, which takes a single parameter (the error which could have been thrown) we put a code that is ran only if an error was thrown. If no error occured, this code will simply be ignored. Here is how it goes:

```sn
try {
  divide(2, 0);
} catch (e: Error) {
  println!("Division failed");
}
```

Here, a message will be displayed because an error has been automatically thrown when `divide` attempted to divided two by zero.

The great point of `try` and `catch` blocks is that the error is, well, _catch_ by the second block, so our program won't crash.

We can also use the `catch` block's argument to get additional informations about the error, like its message or traceback.

### Sub-typing with errors

Of course, as `catch` blocks ask for an error type, they support sub-typing. There are several numerous native error classes, like `ArithmeticError` or `OutOfMemoryError` (which occurs when the memory is filled). So, if we want to catch only some type of errors, we can use sub-typing in the `catch`, like this:

```sn
try {
  divide(2, 0);
} catch (e: OutOfMemoryError) {
  println!("Program is out of memory.");
}
```

Unless we really fill the memory up, this `catch` block will never display anything. But, we can also chain multiple `catch` blocks, to catch distinctly several types of error.

```sn
try {
  divide(2, 0);
} catch (e: OutOfMemoryError) {
  println!("Program is out of memory.");
} catch (e: ArithmeticError) {
  println!("Division failed because we can't divide by zero.");
}
```

Thanks to sub-typing (again), we can also use a final `catch` block that will catch absolutely any type of error:

```sn
try {
  divide(2, 0);
} catch (e: OutOfMemoryError) {
  println!("Program is out of memory.");
} catch (e: ArithmeticError) {
  println!("Division failed because we can't divide by zero.");
} catch (e: Error) {
  println!("An unknown error occured. Here is its message:");
  println!(e.message);
}
```

Also, thanks to inferred typing, if we give no type to the block's argument, it will be considered as `Error` automatically:

```sn
try {
  divide(2, 0);
} catch (e) {
  println!("Some error occured. Here is its message:");
  println!(e.message);
}
```

A last version of this syntax is if we don't care about getting an error object. In this case, we can simply omit the block's head:

```sn
try {
  divide(2, 0);
} catch {
  println!("Some error occured.");
}
```

### Making custom errors

Throwing custom errors simply consists in throwing an instance of a child class of `Error`. This allows us to make a distinction between native error types and our own ones. Here is an exemple:

```sn
func divide(left: int, right: int) : float {
  if (right is 0)
    throw new CustomError("Cannot divide by zero.");

  return float(left) / right;
}
```

The `CustomError` class could look like this:

```sn
class CustomError extends Error {
  // A sample function
  public func why() : string ->
    "This is a custom error class";
}
```

Here is a usage example:

```sn
try {
  divide(5, 0);
} catch (e: CustomError) {
  println!(e.why()); // Prints: "This is a custom error class"
}
```

Here, `CustomError` can be caught apart from other errors like `OutOfMemoryError`.

### Inline `try` and `catch`

These blocks are quite useful, but they can be heavy to write. Like `for` or `while` loops, there is an _inline_ version of `try` and `catch` blocks. Here is how it goes:

```sn
// Classic way
try {
  divide(5, 0);
} catch (e: CustomError) {
  println!(e.why());
}

// Inline way
try divide(5, 0) catch (e: CustomError) {
  println!(e.why());
}
```

That's as simmple as that. There's also a syntax even lighter for single-instruction blocks:

```sn
try divide(5, 0) catch (e: CustomError) -> println!(e.why());
```

Also, if the function returns something, we can use its result, like this:

```sn
val result = try divide(5, 0) catch (e: CustomError) -> println!(e.why());

val result = try divide(5, 0)
             catch (e: CustomError) ->
               println!(e.why());
```

This will work as expected. If we don't care about getting an error object, we can omit the `catch`'s argument:

```sn
val result = try divide(5, 0) catch -> println!(e.why());
```

## Nullable types

Here is a short chapter to show another of the most useful concepts in SilverNight: the nullable types. Basically, nullable types are types that can either be an instance of the class they refer to, or `null`. What's the point? Simply to provide a way of returning _nothing_.

### An example with points

To take an example, let's imagine we have a function that look for a point with `x` and `y` attributes equal to zero. It could look like this:

```sn
struct Point {
  name: string;
  x: int;
  y: int;
}

func getNilPoints(list: Point[]) : Point {
  foreach (let point of list)
    if (point.x is 0 and point.y is 0)
      return point;
}
```

This works fine. Now, what if we run this code:

```sn
val point: Point = getNilPoints([]);
```

Our program will crash because `getNilPoints` returned a `void` while a `Point` was expected. This is simply due to the fact no point matched the condition in the `foreach` loop, so the function ended without returning nothing (which is equivalent to returning an instance of `void`). So, in order to make this function works anyway, and without returning a whole structure with a `success` boolean or something ugly, we can use a nullable type:

```sn
func getNilPoints(list: Point[]) : Point? {
```

This allows the function to return a `Point` instance **or** a `void` instance. But, our program will still crash with an error message telling that `Point?` cannot be converted to `Point`. That's simply because we declared our constant with the `Point` type, but we must now tell it can also contain a `void`:

```sn
val point: Point? = getNilPoints();
```

This now works fine. Also, inferred typing can do it automatically, like this:

```sn
val point = getNilPoints();
```

### The `null` value

As we saw, the `getNilPoints()` function can now return an instance of `void`. But what's that, exactly? That's simply a special SilverNight value with no member at all, excepted some overloads like `@toString()` or `@clone()`.

A strict equivalent to the function we saw would be:

```sn
func getNilPoints(list: Point[]) : Point? {
  foreach (let point of list)
    if (point.x is 0 and point.y is 0)
      return point;

  return new void();
}
```

This would achieve exatly the same thing. There's also a native value, named `null`, which is an instance of `void`:

```sn
func getNilPoints(list: Point[]) : Point? {
  foreach (let point of list)
    if (point.x is 0 and point.y is 0)
      return point;

  return null;
}
```

The function still works as expected. In fact, `null` is defined natively with the following instruction (here, `Void` is strictly equivalent to `void`):

```sn
frozen null: Void = new Void();
```

Be aware though, using inferred typing with `null` could result in the following behavior:

```sn
let point = null;
point = getNilPoints([]); // ERROR
```

This will result in an error because inferred typing gave the `void` type to `point`, so it can't receive a `Point?` value.

Now we've saw all this, let's try our function:

```sn
val point1 = getNilPoints([ { name: "Test point", x: 0, y: 0 } ]);
println!(point1.name); // Prints: "Test point"

val point2 = getNilPoints([]);
println!(point2.name); // ERROR
```

The second `println!` call makes our program crash. Why? Simply because `point2` is a `void` instance, so it has no `name` member. We have to check first if our constant contains a `null` value or not, thanks to the `is_null!` macro:

```sn
val point = getNilPoints([]);

if (is_null!(point))
  println!("No point found.");
else
  println!(`A point was found: ${point.name}`);
```

This code will print: `No point found`, as you can guess.

### Checking `null` with `==`

An alternative to writing `is_null!` each time we want to check if a value is `null`, we can use the equality operator `==` or the difference operator `!=`. This can be done thanks the fact two instances of the same class can be compared with these two operators (we'll see that in details in the pointers chapter). So we can write:

```sn
val point = getNilPoints([]);

if (point is null)
  println!("No point found.");
else
  println!(`A point was found: ${point.name}`);
```

Also, thanks to `void` implementing a `@toBoolean` overload which always return `false`, we can do use some native operators like `!` or `point ? doSomething() : doSomethingElse()` on our constant.

### The nullable `?` operator

Here is an operator we can use to do something only if the value is not null. Here is an example:

```sn
val point = getNilPoints([]);
println!(point?.name);
```

Here, because `point` is null, the program won't try to access its `name` property thanks to the `?` operator. Instead, it will return a `void`, so the return type of the expression, whatever `name` is null or not, will be `string?`. This operator avoids crashes when accessing a value's attribute, and will always return null if the value it is applied (the value on its left) on is null.

```sn
// Make a 'Hero' structure
struct Hero {
  name: string;
  hp: int;
  attack: int;
}

// Make a 'Data' structure
struct Data {
  id: int;
  hero: Hero?;
}

// Make a nullable constant
val someData: Data? = null;

// Get the hero object
val dataHero = data?.hero; // A `Hero` with default values for all its attributes

// Prints the hero's name
println!(dataHero?.name); // Prints: ""
```

What happened here? Well, doing `data?.hero` returned `null` because `data` was null. Then, doing `dataHero?.name` also returned a `void` because `dataHero` was null. So the final expression between the `println!`'s parenthesis is a `string?`.

### Automatic typecasting

Let's take an example for this one: we have a function that takes a `string` as an argument, but we want to give it a constant that was declared as a `string?`. Because the function may not be able to handle the `null` value, this should result in an error.

But there's a specific typecasting for nullable types. When giving a nullable type where a standard type is expected, it is automatically cast into the standard type, and an error will be thrown if the value was `null`. Let's take an example:

```sn
func inc(num: int) : int -> num + 1;

val one: int = 1;
val two = inc(one); // Returns: 2

val three: int? = 3;
val four = inc(three); // Returns: 4

val nothing: int? = null;
val result = inc(nothing); // ERROR
```

Note that `two` and `four` automatically gets the `int` type, which is the `inc`'s return type, not `int?`.

The last call to `inc` fails because a `null` value was gave, so typecasting to an `int` failed to be done. In order for this instruction to work, typecasting must be done manually, using:

```sn
val result = inc(int(nothing)); // Returns: 1
```

This works only because both `null` implements `@toInteger()` (which returns `0`).

### Forced nullable typecasting

There's two macros available to turn a nullable value into a standard value, which is `strict!`, and another to turn a standard value into a nullable value, which is `nullable!`. Here is how they go:

```sn
val standard: int = 1;
val nullable: int? = 2;

val one = nullable!(standard);
val two = strict!(nullable);
```

Now, `one` has nullable `int?` type and `two` has standard `int` type.
