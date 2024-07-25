#!/usr/bin/env python3
""" LRU Cache module
"""

from base_caching import BaseCaching
from collections import OrderedDict


class LRUCache(BaseCaching):
    """ Caching algorithm with an LRU (Least Recently Used) eviction policy.
    """

    def __init__(self):
        """  Class initialization
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is None or item is None:
            return

        if key in self.cache_data:
            # Remove the old value to update it later
            self.cache_data.pop(key)
        elif len(self.cache_data) >= self.MAX_ITEMS:
            # If cache is full, remove the least recently used item (LRU)
            oldest_key, _ = self.cache_data.popitem(last=False)
            print("DISCARD:", oldest_key)

        # Add the new item to the cache
        self.cache_data[key] = item

    def get(self, key):
        """ get an item by key
        """
        if key is None or key not in self.cache_data:
            return None

        # Move the accessed item to the end to mark it as recently used
        value = self.cache_data.pop(key)
        self.cache_data[key] = value
        return value
