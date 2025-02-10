const createErrorFactory = (name: string) => {
    return class BusinessError extends Error {
      constructor(message: string) {
        super(message);
        this.name = name;
      }
    };
  };
  
  export const ValidationError = createErrorFactory("ValidationError");
  export const UrlError = createErrorFactory("UrlError");
  export const NotFoundError = createErrorFactory("NotFoundError");
  