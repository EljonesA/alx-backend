#!/usr/bin/env python3
""" FIFO Cashe module
"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ caching algorithm with a FIFO (First In First Out) eviction policy.
    """

    def __init__(self):
        """ Class initialization
        """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is None or item is None:
            return

        if key in self.cache_data:
            # If key already exists, update the order
            self.order.remove(key)
        elif len(self.cache_data) >= self.MAX_ITEMS:
            # If cache is full, remove the oldest item (FIFO)
            oldest_key = self.order.pop(0)
            del self.cache_data[oldest_key]
            print("DISCARD:", oldest_key)

        self.cache_data[key] = item
        self.order.append(key)

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key)
