# Components

## Solution Catalogue Data

This module describes the meta model within which solutions are defined

[see SolutionData](./SolutionData.md)

## Inventory Repository

The repository contains a representation of inventory of the enterprise on the master branch.

In progress solutions will be represented as branches.

## Verification repository

This repository will contain solution verifications tests.

## Continuous verification

This component will monitor the inventory repository and run verification tests as commits are made to the repository.
It will also compile publish artifacts.
Finally it will publish service registration tests to control the release life cycle for run time artifacts.

## Modeling tool

This modelling tool is used by architects to express the components and relationship.
