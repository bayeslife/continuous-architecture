# Verifiable Architecture Constraints

## Product-service-resource Mapping

As an architect I want every product to be related to resource or CFS so that I can ensure that dependencies are met.
As an architect I want every cfs to be associated with 1 or more rfs so that I can ensure that it is realizable.


## Qualification

As an architect I want services with associated qualifications to be available to those who take orders for product involving those services.

## Ordering

As an architect I want a service (capability) to be available to order each product so that I know it is orderable.
As an architect I want a service to be available to capture the customer details so that the customer can be billed and supported.



## Provisioning

As an architect I want a service to be available to process the order so that the service can be provisioned.

## Service mapping

As an architect I want to ensure that all resource facing services are mapped to components and resources so that I can ensure they are realizable.

## Inventory alignment

All service specifications identified as existing relate to functionality provided in production.

A solution can reference service specifications which are identified as in production, in development by other projects or to be developed as part of the solution.

This verification step can itemize that all solution services are identified as being on one of these 3 states.


### Capacity Verification

Load onto particular components is usually a cumulative effect where it is useful to compare the volume provided by other products/services compared to a new product/service.


### Security Zones

Are services placed in the correct zones?

If the service is consumed by the Customer or Supplier its in the DMZ.
If the service produces a user interface, its presentation.
If the service provides APIs its application.
If the service provides persistence its data

### Enterprise Framework Mapping

Does a product solution link to all aspects of a Sell-Build-Run enterprise paradigm.

### Logical and physical connectivity validation

Is all logical connectivity supported by underlying physical connectivity?

### Service Specification completeness

For the dependencies of a product in terms of services, are all characteristics captured via the order process, defaulted by the specification or supplied by references.
