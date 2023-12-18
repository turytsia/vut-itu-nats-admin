# Nats admin

## What is Nats?

NATS, short for Neural Autonomic Transport System, is an open-source communication system meticulously crafted to be lightweight, straightforward, and high-performing. Built on the principles of publish-subscribe and request-response, NATS facilitates communication among various components within distributed systems. Its noteworthy attributes include speed and low latency, rendering it particularly suitable for scenarios requiring real-time communication and scalability.

## NSC

Authorization within the NATS system is managed by the NSC, a command-line utility. It empowers administrators to configure accounts, define user access rights, and set authentication parameters. However, a notable drawback of the NSC is its limited suitability for automation and integration into enterprise ecosystems. Storing all configurations and keys locally poses challenges in distributed development environments. To address this issue, a solution is proposed using the REST API. This standardized approach facilitates seamless integration with existing APIs and frontends.

# Usage
Client is using docker for running application.
```bash
docker-compose up
```
