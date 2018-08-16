# Roadmap

SilverNight is released using a system of **stages**, as described below.

The project is currently at **Stage 2**.

## Stage 0: Scratch

**Version:** -

**Milestones:**

* Make a first version of the syntax
* Redact [The Hybrid Book](docs/hybrid.md)

**Objective:** Get a first draft of the language.

## Stage 1: Alpha 1

**Version:** 0.1.0

**Milestones:**

* Make a second version of the syntax
* Redact again [The Hybrid Book](docs/hybrid.md) to fix errors and improve explanations

**Objective:** Get a concrete view of the language.

## Stage 2: Alpha 2

**Version:** 0.2.0

**Milestones:**

* Redact [The Specifications Book](docs/specs.md)
* Redact [The Building Book](docs/building.md)
* Develop [The Standard Library](src/libraries/std.sn)

**Objective:** Specify exactly how the language works and explain the toolchain.

## Stage 3: Alpha 3

**Version:** 0.3.0

**Milestones:**

* Submit the project to reviewers
* Develop [The Frontend Libraries](src/libraries)

**Objective:** Get new point of views on the language to improve it.

## Stage 4: Beta

**Version:** >= 0.4.0

**Milestones:**

* Set a definitive version of the syntax
* Set a definitive version of the native library (standard + frontend)

**Objective:** Make the language stable, do not allow breaking changes anymore (until it is highly required).

## Stage 5: Stable

**Version:** >= 1.0.0

**Milestones:**

* Develop the builder
* Develop a test suite for the builder
* Develop a test suite for the native library

**Objective:** Make the language analyzable and watch for regressions.

## Stage 6: Analyzable

**Version:** >= 1.0.0

**Milestones:**

* Develop the compiler
* Develop the interpreter
* Develop the JavaScript transpiler
* Heavy testing on these modules

**Objectives:**

Make the language fully usable and ready for production.

## Stage 7: Production-ready

**Version:** >= 1.0.0

**Milestones:**

* Develop the WebAssembly transpiler
* Develop the C++ transpiler
* Develop the Java transpiler
* Develop the Swift transpiler
* Develop the PHP transpiler
* Develop the TypeScript backpiler (convert TypeScript source code to SilverNight)
* Develop the optimizer
* Create a public repository

**Objective:** Make the language usable in every contexts it has been designed for.

## Stage 8: Continuous development

**Version:** >= 1.0.0

**Milestones:**

* Possibly develop other transpilers
* Constantly improve the language
* Constantly improve the native library
* Constantly improve the toolchain

**Objective:** Improve the project continuously.
