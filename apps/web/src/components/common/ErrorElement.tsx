import { useEffect, useRef } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { repository } from '@pkg'

import { attachOpenInEditor } from '~/lib/dev'

import { StyledButton } from '../ui'

export function ErrorElement() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : JSON.stringify(error)
  const stack = error instanceof Error ? error.stack : null

  useEffect(() => {
    console.error('Error handled by React Router default ErrorBoundary:', error)
  }, [error])

  const reloadRef = useRef(false)
  if (
    message.startsWith('Failed to fetch dynamically imported module') &&
    window.sessionStorage.getItem('reload') !== '1'
  ) {
    if (reloadRef.current) return null
    window.sessionStorage.setItem('reload', '1')
    window.location.reload()
    reloadRef.current = true
    return null
  }

  return (
    <div className="m-auto flex min-h-full max-w-prose select-text flex-col p-8 pt-12">
      <div className="fixed inset-x-0 top-0 h-12" />
      <div className="center flex flex-col">
        <i className="i-mingcute-bug-fill size-12 text-red-400" />
        <h2 className="mt-12 text-2xl">
          Sorry, the app has encountered an error
        </h2>
      </div>
      <h3 className="my-4 text-xl">{message}</h3>
      {import.meta.env.DEV && stack ? (
        <div className="mt-4 cursor-text overflow-auto whitespace-pre rounded-md bg-red-50 p-4 text-left font-mono text-sm text-red-600">
          {attachOpenInEditor(stack)}
        </div>
      ) : null}

      <p className="my-8">
        The App has a temporary problem, click the button below to try reloading
        the app or another solution?
      </p>

      <div className="center gap-4">
        <StyledButton onClick={() => (window.location.href = '/')}>
          Reload
        </StyledButton>
      </div>

      <p className="mt-8">
        Still having this issue? Please give feedback in Github, thanks!
        <a
          className="text-theme-accent-500 hover:text-theme-accent ml-2 cursor-pointer duration-200"
          href={`${repository.url}/issues/new?title=${encodeURIComponent(
            `Error: ${message}`,
          )}&body=${encodeURIComponent(
            `### Error\n\n${message}\n\n### Stack\n\n\`\`\`\n${stack}\n\`\`\``,
          )}&label=bug`}
          target="_blank"
          rel="noreferrer"
        >
          Submit Issue
        </a>
      </p>
      <div className="grow" />
    </div>
  )
}
