#!/usr/bin/env python3
"""
Pagination: returns a tuple of start & end idx for the provided page and
end date
"""

import csv
import math
from typing import List
from typing import Dict


def index_range(page: int, page_size: int) -> tuple:
    """
    Return a tuple containing a start index and an end index
    corresponding to the range of indexes to return in a list
    for those particular pagination parameters.
    """
    start_idx = (page - 1) * page_size
    end_idx = page * page_size
    return (start_idx, end_idx)


class Server:
    """Server page to paginate a database of popular baby names"""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Get a page from the dataset.
        Returns: the list of rows for the requested page
        """
        # using assert to ensure variables are positive integers
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        # get requested page data start & end indexes in the dataset
        start_idx, end_idx = index_range(page, page_size)
        dataset = self.dataset()

        # is input arguments out of range? return empty list
        if start_idx >= len(dataset):
            return []

        # retrieve page based on start & end indexes
        page = dataset[start_idx:end_idx]

        return page

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """ Get dictionary containing pagination metadata """
        # fetch requested page
        requested_page = self.get_page(page, page_size)

        # compute pagination metadata
        dataset_rows = len(self.dataset())
        total_pages = math.ceil(dataset_rows / page_size)
        prev_page = page - 1 if page > 1 else None
        next_page = page + 1 if page < total_pages else None

        data = {
                "page_size": page_size,
                "page": page,
                "data": requested_page,
                "next_page": next_page,
                "prev_page": prev_page,
                "total_pages": total_pages
        }
        return data


if __name__ == "__main__":
    index_range()
