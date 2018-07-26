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