#!/usr/bin/env python3
"""
Pagination: returns a tuple of start & end idx for the provided page and
end date
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    Return a tuple containing a start index and an end index
    corresponding to the range of indexes to return in a list
    for those particular pagination parameters.
    """
    start_idx = (page - 1) * page_size
    end_idx = page * page_size
    return (start_idx, end_idx)


if __name__ == "__main__":
    index_range()
