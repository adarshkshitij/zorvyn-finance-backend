import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Zorvyn Finance Backend API",
    version: "1.0.0",
    description: "Professional TypeScript + Prisma backend for finance data processing and access control."
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      AuthRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 }
        }
      },
      UserRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          role: { type: "string", enum: ["admin", "analyst", "viewer"] },
          status: { type: "string", enum: ["active", "inactive"] }
        }
      },
      RecordRequest: {
        type: "object",
        required: ["title", "amount", "type", "category", "date"],
        properties: {
          title: { type: "string" },
          amount: { type: "number" },
          type: { type: "string", enum: ["income", "expense"] },
          category: { type: "string" },
          date: { type: "string", format: "date" },
          notes: { type: "string" }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/health": {
      get: {
        summary: "Health check",
        responses: { "200": { description: "Service is healthy" } }
      }
    },
    "/api/auth/register-admin": {
      post: {
        summary: "Register the first admin",
        security: [],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/UserRequest" } } }
        },
        responses: { "201": { description: "Admin created" } }
      }
    },
    "/api/auth/login": {
      post: {
        summary: "Login user",
        security: [],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/AuthRequest" } } }
        },
        responses: { "200": { description: "Login success" } }
      }
    },
    "/api/users": {
      get: { summary: "List users", responses: { "200": { description: "Users fetched" } } },
      post: {
        summary: "Create user",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/UserRequest" } } }
        },
        responses: { "201": { description: "User created" } }
      }
    },
    "/api/records": {
      get: { summary: "List records", responses: { "200": { description: "Records fetched" } } },
      post: {
        summary: "Create record",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/RecordRequest" } } }
        },
        responses: { "201": { description: "Record created" } }
      }
    },
    "/api/summaries": {
      get: {
        summary: "Get dashboard summary",
        responses: { "200": { description: "Summary fetched" } }
      }
    }
  }
};

export const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: []
});
