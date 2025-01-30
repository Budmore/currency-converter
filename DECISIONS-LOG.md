## Decisions

### Initial Setup

- **Decision**: Use a minimal set of third-party libraries.
- **Justification**: This approach keeps the app lightweight and simple. By limiting ourselves to essential libraries, we reduce complexity, which is ideal for our straightforward currency converter.

### UI Framework

- **Decision**: Choose React with TypeScript as the UI library.
- **Justification**: React provides a robust ecosystem and efficient rendering for building interactive user interfaces. TypeScript enhances development by catching errors early, during compile time.

### UI Components Library

- **Decision**: Avoid using any third-party libraries.
- **Justification**: This app only has a couple of components, so there is no need to import any additional libraries.

### Testing Strategy

- **Decision**: Implement Jest with the React Testing Library.
- **Justification**: Jest offers a comprehensive testing framework, and React Testing Library enables rendering React components within Jest tests. For end-to-end testing, consider using Cypress.

### Build Tool Selection

- **Decision**: Adopt Vite as the build tool.
- **Justification**: Vite provides a faster development experience for projects that do not have many files. It is excellent for proof-of-concept (POC) apps.

### Future Considerations

- **react-query**: For fetching and caching requests to the API.
- **i18next**: For translations.
- **zustand**: For managing the global store.
- **styled-components**: For styling components.
- **Sentry**: To aggregate logs from browser exceptions.
- **CVE-check**: Add a CVE Vulnerability Check to CI/CD pipelines.
- **SonarCloud**: Static code analysis tool, e.g., SonarCloud for CI/CD pipelines.
