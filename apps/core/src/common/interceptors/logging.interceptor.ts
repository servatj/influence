/**
 * Logging interceptor.
 * @file 日志拦截器
 * @module interceptor/logging
 * @author Surmon <https://github.com/surmon-china>
 * @author Innei <https://github.com/Innei>
 */
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { HTTP_REQUEST_TIME } from '@core/constants/meta.constant'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  SetMetadata,
} from '@nestjs/common'
import { isDev } from '@core/global/env.global'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: Logger

  constructor() {
    this.logger = new Logger(LoggingInterceptor.name)
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle()
    if (!isDev) {
      return call$
    }
    const request = this.getRequest(context)
    const content = `${request.method} -> ${request.url}`
    Logger.debug(`+++ Request：${content}`, LoggingInterceptor.name)
    const now = Date.now()
    SetMetadata(HTTP_REQUEST_TIME, now)(this.getRequest(context))

    return call$.pipe(
      tap(() =>
        this.logger.debug(`--- Response：${content} +${Date.now() - now}ms`),
      ),
    )
  }

  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    if (req) {
      return req
    }
  }
}
