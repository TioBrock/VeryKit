export interface HttpStatuscode {
  code: number;
  title: string;
  description: string;
  category: string;
}

export const httpStatusCodes: HttpStatuscode[] = [
  // 1xx Informational
  { code: 100, title: "Continue", description: "The server has received the request headers and the client should proceed to send the request body.", category: "1xx" },
  { code: 101, title: "Switching Protocols", description: "The server is switching protocols as requested by the client via the Upgrade header.", category: "1xx" },
  { code: 102, title: "Processing", description: "The server has received and is processing the request, but no response is available yet.", category: "1xx" },
  { code: 103, title: "Early Hints", description: "Used to return some response headers before final HTTP message.", category: "1xx" },

  // 2xx Success
  { code: 200, title: "OK", description: "The request has succeeded. The meaning depends on the method used.", category: "2xx" },
  { code: 201, title: "Created", description: "The request has been fulfilled and resulted in a new resource being created.", category: "2xx" },
  { code: 202, title: "Accepted", description: "The request has been accepted for processing, but the processing has not been completed.", category: "2xx" },
  { code: 203, title: "Non-Authoritative Information", description: "The request was successful, but the returned meta-information is not from the original server.", category: "2xx" },
  { code: 204, title: "No Content", description: "The server successfully processed the request and is not returning any content.", category: "2xx" },
  { code: 205, title: "Reset Content", description: "The server successfully processed the request, but is not returning any content.", category: "2xx" },
  { code: 206, title: "Partial Content", description: "The server is delivering only part of the resource due to a Range header in the request.", category: "2xx" },
  { code: 207, title: "Multi-Status", description: "The message body that follows is an XML message and can contain a number of separate response codes.", category: "2xx" },
  { code: 208, title: "Already Reported", description: "The members of a DAV binding have already been enumerated in a previous reply.", category: "2xx" },
  { code: 226, title: "IM Used", description: "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations.", category: "2xx" },

  // 3xx Redirection
  { code: 300, title: "Multiple Choices", description: "Indicates multiple options for the resource from which the client may choose.", category: "3xx" },
  { code: 301, title: "Moved Permanently", description: "This and all future requests should be directed to the given URI.", category: "3xx" },
  { code: 302, title: "Found", description: "Tells the client to look at another URL.", category: "3xx" },
  { code: 303, title: "See Other", description: "The response to the request can be found under another URI using a GET method.", category: "3xx" },
  { code: 304, title: "Not Modified", description: "Indicates the resource has not been modified since the version specified by the request headers.", category: "3xx" },
  { code: 305, title: "Use Proxy", description: "The requested resource is available only through a proxy.", category: "3xx" },
  { code: 306, title: "Unused", description: "This status code was used in a previous version of the specification but is now unused.", category: "3xx" },
  { code: 307, title: "Temporary Redirect", description: "The request should be repeated with another URI but future requests should still use the original URI.", category: "3xx" },
  { code: 308, title: "Permanent Redirect", description: "The request and all future requests should be repeated using another URI.", category: "3xx" },

  // 4xx Client Errors
  { code: 400, title: "Bad Request", description: "The server cannot or will not process the request due to an apparent client error.", category: "4xx" },
  { code: 401, title: "Unauthorized", description: "Authentication is required and has either failed or not been provided.", category: "4xx" },
  { code: 402, title: "Payment Required", description: "Reserved for future use.", category: "4xx" },
  { code: 403, title: "Forbidden", description: "The request was valid, but the server is refusing action.", category: "4xx" },
  { code: 404, title: "Not Found", description: "The requested resource could not be found but may be available in the future.", category: "4xx" },
  { code: 405, title: "Method Not Allowed", description: "A request method is not supported for the requested resource.", category: "4xx" },
  { code: 406, title: "Not Acceptable", description: "The requested resource is capable of generating content not acceptable according to the Accept headers.", category: "4xx" },
  { code: 407, title: "Proxy Authentication Required", description: "The client must first authenticate itself with the proxy.", category: "4xx" },
  { code: 408, title: "Request Timeout", description: "The server timed out waiting for the request from the client.", category: "4xx" },
  { code: 409, title: "Conflict", description: "Indicates that the request could not be processed because of conflict in the current state of the resource.", category: "4xx" },
  { code: 410, title: "Gone", description: "Indicates that the resource requested is no longer available and will not be available again.", category: "4xx" },
  { code: 411, title: "Length Required", description: "The request did not specify the length of its content, which is required by the requested resource.", category: "4xx" },
  { code: 412, title: "Precondition Failed", description: "The server does not meet one of the preconditions that the requester put on the request.", category: "4xx" },
  { code: 413, title: "Content Too Large", description: "The request is larger than the server is willing or able to process.", category: "4xx" },
  { code: 414, title: "URI Too Long", description: "The URI provided was too long for the server to process.", category: "4xx" },
  { code: 415, title: "Unsupported Media Type", description: "The request entity has a media type which the server or resource does not support.", category: "4xx" },
  { code: 416, title: "Range Not Satisfiable", description: "The client has asked for a portion of the file, but the server cannot supply that portion.", category: "4xx" },
  { code: 417, title: "Expectation Failed", description: "The server cannot meet the requirements of the Expect request-header field.", category: "4xx" },
  { code: 418, title: "I'm a Teapot", description: "The server refuses the attempt to brew coffee with a teapot.", category: "4xx" },
  { code: 421, title: "Misdirected Request", description: "The request was directed at a server that is not able to produce a response.", category: "4xx" },
  { code: 422, title: "Unprocessable Content", description: "The request was well-formed but was unable to be followed due to semantic errors.", category: "4xx" },
  { code: 423, title: "Locked", description: "The resource that is being accessed is locked.", category: "4xx" },
  { code: 424, title: "Failed Dependency", description: "The request failed because it depended on another request and that request failed.", category: "4xx" },
  { code: 425, title: "Too Early", description: "Indicates that the server is unwilling to risk processing a request that might be replayed.", category: "4xx" },
  { code: 426, title: "Upgrade Required", description: "The client should switch to a different protocol.", category: "4xx" },
  { code: 428, title: "Precondition Required", description: "The origin server requires the request to be conditional.", category: "4xx" },
  { code: 429, title: "Too Many Requests", description: "The user has sent too many requests in a given amount of time.", category: "4xx" },
  { code: 431, title: "Request Header Fields Too Large", description: "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.", category: "4xx" },
  { code: 451, title: "Unavailable For Legal Reasons", description: "A server operator has received a legal demand to deny access to a resource.", category: "4xx" },

  // 5xx Server Errors
  { code: 500, title: "Internal Server Error", description: "A generic error message, given when an unexpected condition was encountered.", category: "5xx" },
  { code: 501, title: "Not Implemented", description: "The server either does not recognize the request method, or it lacks the ability to fulfil the request.", category: "5xx" },
  { code: 502, title: "Bad Gateway", description: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.", category: "5xx" },
  { code: 503, title: "Service Unavailable", description: "The server cannot handle the request (because it is overloaded or down for maintenance).", category: "5xx" },
  { code: 504, title: "Gateway Timeout", description: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.", category: "5xx" },
  { code: 505, title: "HTTP Version Not Supported", description: "The server does not support the HTTP protocol version used in the request.", category: "5xx" },
  { code: 506, title: "Variant Also Negotiates", description: "Transparent content negotiation for the request results in a circular reference.", category: "5xx" },
  { code: 507, title: "Insufficient Storage", description: "The server is unable to store the representation needed to complete the request.", category: "5xx" },
  { code: 508, title: "Loop Detected", description: "The server detected an infinite loop while processing the request.", category: "5xx" },
  { code: 510, title: "Not Extended", description: "Further extensions to the request are required for the server to fulfil it.", category: "5xx" },
  { code: 511, title: "Network Authentication Required", description: "The client needs to authenticate to gain network access.", category: "5xx" },
];
