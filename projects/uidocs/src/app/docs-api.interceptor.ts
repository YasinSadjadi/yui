import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

const people = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer' },
  { id: 2, name: 'Grace Hopper', role: 'Admiral' },
  { id: 3, name: 'Katherine Johnson', role: 'Mathematician' },
  { id: 4, name: 'Alan Turing', role: 'Researcher' },
];

const tasks = [
  { id: 1, title: 'Design component gallery', status: 'In progress', owner: 'Ada Lovelace' },
  { id: 2, title: 'Document form controls', status: 'Done', owner: 'Grace Hopper' },
  { id: 3, title: 'Review modal behavior', status: 'Todo', owner: 'Alan Turing' },
  { id: 4, title: 'Polish notification styles', status: 'In progress', owner: 'Katherine Johnson' },
  { id: 5, title: 'Prepare package release', status: 'Todo', owner: 'Ada Lovelace' },
  { id: 6, title: 'Add grid examples', status: 'Done', owner: 'Grace Hopper' },
];

function listResponse<T>(results: T[], totalCount = results.length, totalPages = 1) {
  return { succeeded: true, results, totalCount, totalPages };
}

export const docsApiInterceptor: HttpInterceptorFn = (request, next) => {
  const url = new URL(request.url, window.location.origin);

  if (url.pathname === '/api/people') {
    const term = (url.searchParams.get('searchTerm') ?? '').toLowerCase();
    const results = people.filter((person) => person.name.toLowerCase().includes(term));
    return of(new HttpResponse({ body: listResponse(results) }));
  }

  if (url.pathname === '/api/tasks') {
    const pageNumber = Number(url.searchParams.get('pageNumber') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 25);
    const start = (pageNumber - 1) * pageSize;
    const page = tasks.slice(start, start + pageSize);
    return of(new HttpResponse({ body: listResponse(page, tasks.length, Math.ceil(tasks.length / pageSize)) }));
  }

  return next(request);
};
