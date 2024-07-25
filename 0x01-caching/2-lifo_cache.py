#!/usr/bin/env python3
""" LIFO Cache module
"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ Caching algorithm with a LIFO (Last In First Out) eviction policy.
    """

    def __init__(self):
        """ class initialization
        """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is None or item is None:
            return

        if key in self.cache_data:
            # If key already exists, remove it from the order list
            self.order.remove(key)
        elif len(self.cache_data) >= self.MAX_ITEMS:
            # If cache is full, remove the most recently added item (LIFO)
            last_key = self.order.pop()
            del self.cache_data[last_key]
            print("DISCARD:", last_key)

        self.cache_data[key] = item
        self.order.append(key)

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key)
