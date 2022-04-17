package com.congressconnection.conspring.enums.converters;

import com.congressconnection.conspring.enums.Party;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PartyConverter implements Converter<String, Party> {
    @Override
    public Party convert(String source) {
        return Party.valueOf(source.toUpperCase());
    }
}
