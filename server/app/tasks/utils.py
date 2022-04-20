import numpy as np


def get_tags(data):

    names = []
    for raw_tag in data["tags"]:
        tag_names = raw_tag.split("|")
        tag_names = [item.lower().strip() for item in raw_tag.split("|") if item]

        names.extend(tag_names)

    # np_names = np.array(names)
    tags, counts = np.unique(names, return_counts=True)

    return dict(zip(tags, counts))
