#!/usr/bin/env python3
""" MRU Cache module
"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ Caching algorithm with an MRU (Most Recently Used) eviction policy.
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
            # Remove the old value to update it later
            self.order.remove(key)
        elif len(self.cache_data) >= self.MAX_ITEMS:
            # If cache is full, remove the most recently used item (MRU)
            most_recent_key = self.order.pop()
            del self.cache_data[most_recent_key]
            print("DISCARD:", most_recent_key)

        # Add the new item to the cache
        self.cache_data[key] = item
        self.order.append(key)

    def get(self, key):
        """ Get an item by key
        """
        if key is None or key not in self.cache_data:
            return None

        # Move the accessed item to the end to mark it as recently used
        self.order.remove(key)
        self.order.append(key)
        return self.cache_data[key]
