export const formatNumber = function (num: number, decimals?: number, units?: string[]): string {
  const UNITS = units || ["", "K", "M", "B", "T"];
  const DECIMALS = decimals || 0;
  const isNegative = num < 0;
  let i = 0;
  let formattedNum = Math.abs(num);

  while (formattedNum >= 1000 && i < UNITS.length - 1) {
    formattedNum /= 1000;
    i++;
  }

  const result = formattedNum.toFixed(DECIMALS) + UNITS[i];

  return isNegative ? "-" + result : result;
}


export function getPaginationItems(
  currentPage: number,
  lastPage: number,
  maxLength: number
) {
  const res: Array<number> = [];

  // handle lastPage less than maxLength
  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i++) {
      res.push(i);
    }
  }

  // handle ellipsis logics
  else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2;

    // handle ellipsis in the middle
    if (
      currentPage - firstPage < sideLength ||
      lastPage - currentPage < sideLength
    ) {
      for (let j = 1; j <= sideLength + firstPage; j++) {
        res.push(j);
      }

      res.push(NaN);

      for (let k = lastPage - sideLength; k <= lastPage; k++) {
        res.push(k);
      }
    }

    // handle two ellipsis
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1;

      res.push(1);
      res.push(NaN);

      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l++
      ) {
        res.push(l);
      }

      res.push(NaN);
      res.push(lastPage);
    }

    // handle ellipsis not in the middle
    else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m);
          remainingLength -= 1;
        }

        res.push(NaN);
        remainingLength -= 1;

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
          res.push(n);
        }
      } else {
        for (let o = lastPage; o >= currentPage - 1; o--) {
          res.unshift(o);
          remainingLength -= 1;
        }

        res.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= 1; p--) {
          res.unshift(p);
        }
      }
    }
  }

  return res;
}


export const chunk = <T = any>(arr: T[] = [], size = 1): T[][] =>
  arr.length
    ? arr.reduce<T[][]>(
      (t, v) => {
        t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v);
        return t;
      },
      [[]]
    )
    : [];


export function generatePages(totalPage: number): Record<number, { label: string }> {
  const pages: Record<number, { label: string }> = {};
  for (let i = 1; i <= totalPage; i++) {
    pages[i] = {
      label: '' + i,
    };
  }
  return pages;
}

export function timeAgo(date: Date): string {
  const now = new Date();
  date= new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    if (diffInYears === 1) {
      return '1 year ago';
    }
    const remainingMonths = diffInMonths % 12;
    return remainingMonths > 0
      ? `${diffInYears} years and ${remainingMonths} months ago`
      : `${diffInYears} years ago`;
  } else if (diffInMonths > 0) {
    if (diffInMonths === 1) {
      return '1 month ago';
    }
    return `${diffInMonths} months ago`;
  } else if (diffInWeeks > 0) {
    if (diffInWeeks === 1) {
      return '1 week ago';
    }
    return `${diffInWeeks} weeks ago`;
  } else if (diffInDays > 0) {
    if (diffInDays === 1) {
      return '1 day ago';
    }
    return `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    if (diffInHours === 1) {
      return '1 hour ago';
    }
    return `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    if (diffInMinutes === 1) {
      return '1 minute ago';
    }
    return `${diffInMinutes} minutes ago`;
  } else {
    if (diffInSeconds === 1) {
      return '1 second ago';
    }
    return `${diffInSeconds} seconds ago`;
  }
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}
