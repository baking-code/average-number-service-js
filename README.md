# Average Number Service

## Description

Lightweight express app which calls a configured endpoint periodically and calculates a cumulative average of random numbers.

### Behaviours and assumptions

- The configured handler assumes a response type as detailed here https://csrng.net/documentation/csrng-lite/.

- If any call to the endpoint returns an error, the application exits
  - This is to ensure any application runner/container can restart if required
- The endpoint is subject to rate limiting, but in this use case it is not predicted to occur, as such any error of this nature is subject to the above.
  - If requirements favoured uptime instead of calling every second, then a retry mechanism with backoff would be introduced to adhere to the rate limit.
- The latest number retrieved from the service is stored in memory, but instead of storing _all_ collected numbers in memory the application calculates a cumulative average to avoid memory bloat over time.
- Using a recursive timeout to call the endpoint every second is a trade off:
  - It is simple to implement and understand
  - Can be tested with jest's fake timers
  - It is cancellable (i.e on exit); but
  - It relies on the event loop so may not actually be run every second
  - It may still call endpoint after it's been cancelled.
 
### Future Improvements

- This application will handle a single average counter per process, if it were to scale (e.g consume many average numbers per second) then either:
  - Use of worker threads to parallelise, with limited scaling.
  - Caching with a persistence layer
would be required

- Indeed, more expensive/latent processing would need to be asynchronous in nature, perhaps using an event-driven architecture
  - Care would need to be taken to keep the main thread free to repsond to requests
- Although the application would be suitable for a container based deployment model, any further configuration may need to be accompanied by something more dynamic than environment variables

## Run

To start the service, run

```
npm run start
```

## Testing

There are unit tests to cover the functionality and an integration test to verify calling the express server.

To run

```
npm run test
```
