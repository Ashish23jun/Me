import time
from functools import wraps
from typing import Any

_cache: dict[str, tuple[Any, float]] = {}

def ttl_cache(seconds: int):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            key = fn.__name__
            cached, ts = _cache.get(key, (None, 0))
            if cached is not None and time.time() - ts < seconds:
                return cached
            result = fn(*args, **kwargs)
            _cache[key] = (result, time.time())
            return result
        return wrapper
    return decorator
