import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

interface PerformanceMetrics {
  method: string;
  url: string;
  duration: number;
  timestamp: string;
}

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PerformanceInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;

        // Log performance metrics
        this.logger.log(`${method} ${url} - ${duration}ms`);

        // Send metrics to Vercel (in production)
        if (process.env.NODE_ENV === 'production') {
          this.sendMetricsToVercel({
            method,
            url,
            duration,
            timestamp: new Date().toISOString(),
          });
        }
      }),
    );
  }

  private sendMetricsToVercel(metrics: PerformanceMetrics): void {
    // In production, you can send these metrics to Vercel's analytics
    // For now, we'll just log them
    console.log('Performance Metrics:', JSON.stringify(metrics));
  }
}
