import React, { useCallback, useState } from 'react';
import Tags from '@yaireo/tagify/react';
import '@yaireo/tagify/dist/tagify.css';

const TagInput = ({ whitelist = [], placeholder = 'Add some tags', settings = {}, defaultValue = '', onChange }) => {
    const initialTags = Array.isArray(defaultValue) ? defaultValue : defaultValue.split(',').map(tag => tag.trim());
    const [tags, setTags] = useState(initialTags);

    const handleChange = useCallback((e) => {
        const newTags = e.detail.tagify.getCleanValue();
        setTags(newTags);
        if (onChange) {
            onChange({ detail: { value: newTags.map(tag => ({ value: tag.value })) } });
        }
    }, [onChange]);

    React.useEffect(() => {
        if (onChange) {
            onChange({ detail: { value: tags } });
        }
    }, [tags, onChange]);

    return (
        <Tags
            whitelist={whitelist}
            placeholder={placeholder}
            settings={settings}
            defaultValue={initialTags}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
};

export default TagInput;
