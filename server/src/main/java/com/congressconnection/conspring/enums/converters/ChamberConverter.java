package com.congressconnection.conspring.enums.converters;

import com.congressconnection.conspring.enums.Chamber;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ChamberConverter implements Converter<String, Chamber> {
    @Override
    public Chamber convert(String source) {
        return Chamber.valueOf(source.toLowerCase());
    }
}
